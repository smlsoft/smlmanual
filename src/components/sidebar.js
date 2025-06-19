import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Sidebar = ({ isOpen, onToggle }) => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
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

  const sidebarStyles = {
    position: 'fixed',
    top: 0,
    left: isOpen ? 0 : '-320px',
    width: '320px',
    height: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e1e4e8',
    boxShadow: isOpen ? '2px 0 10px rgba(0,0,0,0.15)' : 'none',
    transition: 'left 0.3s ease, box-shadow 0.3s ease',
    zIndex: 1000,
    overflow: 'auto',
    padding: '0',
    '@media (max-width: 768px)': {
      width: '280px',
      left: isOpen ? 0 : '-280px'
    }
  }

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    display: isOpen ? 'block' : 'none'
  }

  const sectionHeaderStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1rem',
    backgroundColor: '#f8f9fa',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#333',
    cursor: 'pointer',
    borderBottom: '1px solid #e1e4e8',
    transition: 'background-color 0.2s ease'
  }

  const linkStyles = {
    display: 'block',
    padding: '0.75rem 1.5rem',
    color: '#333',
    textDecoration: 'none',
    fontSize: '0.9rem',
    borderBottom: '1px solid #f0f0f0',
    transition: 'background-color 0.2s ease, padding-left 0.2s ease',
    lineHeight: '1.4'
  }

  const expandIcon = (expanded) => (
    <span style={{ 
      transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease'
    }}>
      ▶
    </span>
  )

  return (
    <>
      {/* Overlay */}
      <div style={overlayStyles} onClick={onToggle} />
      
      {/* Sidebar */}
      <nav style={sidebarStyles}>
        <div style={{ 
          padding: '1.5rem 1rem', 
          borderBottom: '2px solid #663399',
          marginBottom: '0',
          backgroundColor: '#f8f9fa'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#663399',
            fontSize: '1.3rem',
            fontWeight: 'bold'
          }}>
            📚 SML Documentation
          </h2>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.8rem',
            color: '#666'
          }}>
            เลือกหมวดหมู่เอกสาร
          </p>
        </div>

        {/* โปรแกรมบัญชี (Account Program) */}
        <div>
          <button
            style={sectionHeaderStyles}
            onClick={() => toggleSection('account')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e9ecef'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f8f9fa'
            }}
          >
            <span>📊 โปรแกรมบัญชี</span>
            {expandIcon(expandedSections.account)}
          </button>
          {expandedSections.account && categorizedDocs.account && (
            <div>
              {categorizedDocs.account.map(doc => (
                <Link
                  key={doc.fields.slug}
                  to={doc.fields.slug}
                  style={linkStyles}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f0f8ff'
                    e.target.style.paddingLeft = '2rem'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.paddingLeft = '1.5rem'
                  }}
                >
                  {doc.frontmatter.title || doc.fields.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* โปรแกรม POS */}
        <div>
          <button
            style={sectionHeaderStyles}
            onClick={() => toggleSection('pos')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e9ecef'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f8f9fa'
            }}
          >
            <span>🛒 โปรแกรม POS</span>
            {expandIcon(expandedSections.pos)}
          </button>
          {expandedSections.pos && categorizedDocs.pos && (
            <div>
              {categorizedDocs.pos.map(doc => (
                <Link
                  key={doc.fields.slug}
                  to={doc.fields.slug}
                  style={linkStyles}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f0f8ff'
                    e.target.style.paddingLeft = '2rem'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.paddingLeft = '1.5rem'
                  }}
                >
                  {doc.frontmatter.title || doc.fields.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Sidebar
