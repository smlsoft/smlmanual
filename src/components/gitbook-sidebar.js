import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const GitBookSidebar = ({ isOpen, isMobile, currentPath, onToggle }) => {
  const data = useStaticQuery(graphql`
    query GitBookSidebarQuery {
      allMarkdownRemark(sort: { fields: { title: ASC } }) {
        nodes {
          fields {
            slug
            title
          }
          frontmatter {
            title
          }
        }
      }
    }
  `)

  const [expandedSections, setExpandedSections] = useState({
    account: true,
    pos: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const allDocs = data.allMarkdownRemark.nodes

  // Categorize documents
  const categorizedDocs = allDocs.reduce((acc, doc) => {
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
      // Everything else goes to Account category
      if (!acc.account) acc.account = []
      acc.account.push(doc)
    }
    
    return acc
  }, {})

  const sidebarClasses = `gitbook-sidebar ${isMobile ? 'mobile' : ''} ${isOpen ? 'open' : ''}`

  return (
    <nav className={sidebarClasses}>
      {/* Sidebar Header */}
      <div className="gitbook-sidebar-header">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 className="gitbook-sidebar-title">
            📚 SML Documentation
          </h2>
          <p className="gitbook-sidebar-subtitle">
            เลือกหมวดหมู่เอกสาร
          </p>
        </Link>
      </div>

      {/* Search Box */}
      <div className="gitbook-search">
        <input 
          type="text" 
          placeholder="🔍 ค้นหาเอกสาร..." 
          onFocus={(e) => {
            // Simple search placeholder - you can enhance this
            console.log('Search functionality can be enhanced here')
          }}
        />
      </div>

      {/* Navigation */}
      <div className="gitbook-sidebar-nav">
        {/* โปรแกรมบัญชี (Account Program) */}
        <div className="gitbook-nav-section">
          <button
            className="gitbook-nav-section-header"
            onClick={() => toggleSection('account')}
          >
            <span>
              <span className="gitbook-nav-section-icon">📊</span>
              โปรแกรมบัญชี
            </span>
            <span className={`gitbook-nav-section-toggle ${expandedSections.account ? 'expanded' : ''}`}>
              ▶
            </span>
          </button>
          {expandedSections.account && categorizedDocs.account && (
            <div className="gitbook-nav-items">
              {categorizedDocs.account.map(doc => {
                const isActive = currentPath === doc.fields.slug
                return (
                  <Link
                    key={doc.fields.slug}
                    to={doc.fields.slug}
                    className={`gitbook-nav-item ${isActive ? 'active' : ''}`}
                    onClick={isMobile ? onToggle : undefined}
                  >
                    {doc.frontmatter.title || doc.fields.title}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* โปรแกรม POS */}
        <div className="gitbook-nav-section">
          <button
            className="gitbook-nav-section-header"
            onClick={() => toggleSection('pos')}
          >
            <span>
              <span className="gitbook-nav-section-icon">🛒</span>
              โปรแกรม POS
            </span>
            <span className={`gitbook-nav-section-toggle ${expandedSections.pos ? 'expanded' : ''}`}>
              ▶
            </span>
          </button>
          {expandedSections.pos && categorizedDocs.pos && (
            <div className="gitbook-nav-items">
              {categorizedDocs.pos.map(doc => {
                const isActive = currentPath === doc.fields.slug
                return (
                  <Link
                    key={doc.fields.slug}
                    to={doc.fields.slug}
                    className={`gitbook-nav-item ${isActive ? 'active' : ''}`}
                    onClick={isMobile ? onToggle : undefined}
                  >
                    {doc.frontmatter.title || doc.fields.title}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default GitBookSidebar
