const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `docs` })
    
    // Extract title from filename if not in frontmatter
    const fileName = getNode(node.parent).name
    const title = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ')
    
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    
    createNodeField({
      node,
      name: `title`,
      value: title,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: { slug: ASC } }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your markdown files`, result.errors)
    return
  }

  const markdownTemplate = path.resolve(`./src/templates/markdown-page.js`)

  result.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: markdownTemplate,
      context: {
        id: node.id,
      },
    })
  })
}
