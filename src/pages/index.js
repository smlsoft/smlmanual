import * as React from "react"
import { Link, graphql } from "gatsby"

import GitBookLayout from "../components/gitbook-layout"
import Seo from "../components/seo"

const IndexPage = ({ data, location }) => {
  const allDocs = data.allMarkdownRemark.nodes

  // Group docs by category
  const groupedDocs = allDocs.reduce((acc, doc) => {
    const title = doc.frontmatter.title || doc.fields.title
    
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
      if (!acc.pos) acc.pos = []
      acc.pos.push(doc)
    } else {
      if (!acc.account) acc.account = []
      acc.account.push(doc)
    }
    
    return acc
  }, {})

  return (
    <GitBookLayout location={location}>
      <div className="gitbook-home">
        <h1 className="gitbook-home-title">
          SML Documentation
        </h1>
        <p className="gitbook-home-subtitle">
          คู่มือครบครันสำหรับระบบ SML Account และ POS 
          พร้อมคำแนะนำการติดตั้ง คู่มือการใช้งาน และการแก้ไขปัญหา
        </p>

        <div className="gitbook-category-grid">
          {/* โปรแกรมบัญชี Card */}
          <div className="gitbook-category-card">
            <span className="gitbook-category-icon">📊</span>
            <h3 className="gitbook-category-title">โปรแกรมบัญชี</h3>
            <p className="gitbook-category-description">
              เอกสารสำหรับระบบบัญชี SML รวมถึงการตั้งค่า การใช้งาน และคู่มือต่างๆ
            </p>
            <div className="gitbook-category-count">
              {groupedDocs.account ? groupedDocs.account.length : 0} เอกสาร
            </div>
          </div>

          {/* โปรแกรม POS Card */}
          <div className="gitbook-category-card">
            <span className="gitbook-category-icon">🛒</span>
            <h3 className="gitbook-category-title">โปรแกรม POS</h3>
            <p className="gitbook-category-description">
              เอกสารสำหรับระบบขายหน้าร้าน (POS) รวมถึงการตั้งค่าเครื่อง การใช้งาน และอุปกรณ์เสริม
            </p>
            <div className="gitbook-category-count">
              {groupedDocs.pos ? groupedDocs.pos.length : 0} เอกสาร
            </div>
          </div>
        </div>

        {/* Recent Documents */}
        <div style={{ marginTop: '60px', textAlign: 'left' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
            📋 เอกสารล่าสุด
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {allDocs.slice(0, 6).map(doc => (
              <Link 
                key={doc.fields.slug}
                to={doc.fields.slug}
                style={{
                  textDecoration: "none",
                  backgroundColor: "white",
                  border: "1px solid #e1e8ed",
                  borderRadius: "6px",
                  padding: "20px",
                  display: "block",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#667eea"
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#e1e8ed"
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "none"
                }}
              >
                <h4 style={{ 
                  color: "#333", 
                  marginBottom: "8px",
                  fontSize: "1rem",
                  fontWeight: "600"
                }}>
                  {doc.frontmatter.title || doc.fields.title}
                </h4>
                <p style={{ 
                  color: "#666", 
                  fontSize: "0.9rem",
                  margin: "0",
                  lineHeight: "1.4"
                }}>
                  {doc.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </GitBookLayout>
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
