import React from "react"
import { graphql, Link } from "gatsby"
import GitBookLayout from "../components/gitbook-layout"
import GitBookBreadcrumb from "../components/gitbook-breadcrumb"
import Seo from "../components/seo"
import "../styles/prism.css"
import "../styles/markdown.css"

const MarkdownTemplate = ({ data, location }) => {
  const { markdownRemark } = data
  const { frontmatter, html, fields } = markdownRemark

  // Determine category for breadcrumb
  const title = frontmatter.title || fields.title
  let category = 'โปรแกรมบัญชี'
  
  if (title.includes('POS') || 
      title.includes('ระบบการขาย') || 
      title.includes('จอขาย') ||
      title.includes('PosEgg') ||
      title.includes('Customer display') ||
      title.includes('เครื่องชั่ง') ||
      title.includes('Barcode') ||
      title.includes('กำหนดค่าเริ่มต้น-POS') ||
      title.includes('กำหนดคุณสมบัติเครื่องPOS') ||
      title.includes('การกำหนดรหัสเครื่องPOS') ||
      title.includes('การตั้งค่าระบบและกำหนดเครื่องPOS') ||
      title.includes('กำหนดพนักงาน-การใช้งาน-POS')) {
    category = 'โปรแกรม POS'
  }

  return (
    <GitBookLayout location={location}>
      <GitBookBreadcrumb currentTitle={frontmatter.title || fields.title} category={category} />
      <div className="gitbook-main">
        <h1>{frontmatter.title || fields.title}</h1>
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </GitBookLayout>
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
