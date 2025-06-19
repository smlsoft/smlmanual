import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SearchBox from "../components/search-box"

const IndexPage = ({ data }) => {
  const allDocs = data.allMarkdownRemark.nodes
  const [filteredDocs, setFilteredDocs] = React.useState(allDocs)

  // Group docs by category or just show them in a list
  const groupedDocs = filteredDocs.reduce((acc, doc) => {
    const title = doc.frontmatter.title || doc.fields.title
    let category = 'General Documentation'
    
    // More comprehensive categorization
    if (title.includes('POS') || title.includes('ระบบการขาย') || title.includes('จอขาย')) {
      category = 'POS System'
    } else if (title.includes('SML') && !title.includes('TYG') && !title.includes('TomYumGoong')) {
      category = 'SML Account'
    } else if (title.includes('TYG') || title.includes('TomYumGoong') || title.includes('Tom Yum Goong')) {
      category = 'Tom Yum Goong System'
    } else if (title.includes('Server') || title.includes('Install') || title.includes('การติดตั้ง') || title.includes('Setup')) {
      category = 'Installation & Setup'
    } else if (title.includes('การตั้งค่า') || title.includes('กำหนด') || title.includes('Config')) {
      category = 'Configuration & Settings'
    } else if (title.includes('การใช้งาน') || title.includes('คู่มือ') || title.includes('Manual')) {
      category = 'User Manuals'
    } else if (title.includes('ปัญหา') || title.includes('แก้ไข') || title.includes('Troubleshoot')) {
      category = 'Troubleshooting'
    } else if (title.includes('รายงาน') || title.includes('Report') || title.includes('ฟอร์ม') || title.includes('Form')) {
      category = 'Reports & Forms'
    } else if (title.includes('เครื่องมือ') || title.includes('Tool') || title.includes('Tip')) {
      category = 'Tools & Tips'
    }
    
    if (!acc[category]) acc[category] = []
    acc[category].push(doc)
    return acc
  }, {})

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#663399" }}>
            SML Documentation
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Complete documentation for SML Account and POS systems. Find installation guides, 
            user manuals, and troubleshooting information.
          </p>
          <SearchBox docs={allDocs} onFilter={setFilteredDocs} />
        </div>

        {Object.entries(groupedDocs).map(([category, categoryDocs]) => (
          <div key={category} style={{ marginBottom: "3rem" }}>
            <h2 style={{ 
              fontSize: "1.8rem", 
              color: "#333", 
              borderBottom: "2px solid #663399",
              paddingBottom: "0.5rem",
              marginBottom: "1.5rem"
            }}>
              {category}
            </h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem"
            }}>
              {categoryDocs.map(doc => (
                <Link 
                  key={doc.fields.slug}
                  to={doc.fields.slug}
                  style={{
                    textDecoration: "none",
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    display: "block"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"
                    e.target.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"
                    e.target.style.transform = "translateY(0)"
                  }}
                >
                  <h3 style={{ 
                    color: "#663399", 
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                    lineHeight: "1.4"
                  }}>
                    {doc.frontmatter.title || doc.fields.title}
                  </h3>
                  <p style={{ 
                    color: "#666", 
                    fontSize: "0.9rem",
                    margin: "0",
                    lineHeight: "1.5"
                  }}>
                    {doc.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="SML Documentation Home" />

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: { title: ASC } }) {
      nodes {
        fields {
          slug
          title
        }
        frontmatter {
          title
        }
        excerpt(pruneLength: 100)
      }
    }
  }
`

export default IndexPage
