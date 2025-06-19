import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/prism.css"
import "../styles/markdown.css"

const MarkdownTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html, fields } = markdownRemark

  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
        <Link 
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "2rem",
            color: "#663399",
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: "500"
          }}
        >
          ← Back to Documentation Home
        </Link>
        <h1>{frontmatter.title || fields.title}</h1>
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            lineHeight: "1.6",
            fontSize: "1.1rem"
          }}
        />
      </div>
    </Layout>
  )
}

export const Head = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, fields } = markdownRemark
  const title = frontmatter.title || fields.title || "Documentation"
  
  return <Seo title={title} />
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
        title
      }
    }
  }
`

export default MarkdownTemplate
