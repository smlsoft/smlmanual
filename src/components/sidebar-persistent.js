import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const SidebarPersistent = ({ currentPath }) => {
  const data = useStaticQuery(graphql`
    query SidebarPersistentQuery {
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
    transition: 'all 0.2s ease',
    lineHeight: '1.4',
    position: 'relative'
  }

  const activeLinkStyles = {
    ...linkStyles,
    backgroundColor: '#e3f2fd',
    borderLeft: '4px solid #663399',
    fontWeight: '600',
    color: '#663399'
  }

  const expandIcon = (expanded) => (
    <span style={{ 
      transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
      fontSize: '0.8rem'
    }}>
      ▶
    </span>
  )

  return (
    <nav style={{
      height: '100%',
      overflow: 'auto',
      padding: 0
    }}>
      {/* Header */}
      <div style={{ 
        padding: '2rem 1rem 1.5rem 1rem', 
        borderBottom: '2px solid #663399',
        marginBottom: '0',
        backgroundColor: '#663399',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none',
            color: 'white'
          }}
        >
          <h2 style={{ 
            margin: 0, 
            fontSize: '1.4rem',
            fontWeight: 'bold'
          }}>
            📚 SML Documentation
          </h2>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.85rem',
            opacity: 0.9
          }}>
            เลือกหมวดหมู่เอกสาร
          </p>
        </Link>
      </div>

      {/* Navigation Sections */}
      <div style={{ padding: '0' }}>
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
            <div style={{ backgroundColor: '#fafbfc' }}>
              {categorizedDocs.account.map(doc => {
                const isActive = currentPath === doc.fields.slug
                return (
                  <Link
                    key={doc.fields.slug}
                    to={doc.fields.slug}
                    style={isActive ? activeLinkStyles : linkStyles}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = '#e3f2fd'
                        e.target.style.paddingLeft = '2rem'
                        e.target.style.borderLeft = '3px solid #663399'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.paddingLeft = '1.5rem'
                        e.target.style.borderLeft = 'none'
                      }
                    }}
                  >
                    {doc.frontmatter.title || doc.fields.title}
                  </Link>
                )
              })}
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
            <div style={{ backgroundColor: '#fafbfc' }}>
              {categorizedDocs.pos.map(doc => {
                const isActive = currentPath === doc.fields.slug
                return (
                  <Link
                    key={doc.fields.slug}
                    to={doc.fields.slug}
                    style={isActive ? activeLinkStyles : linkStyles}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = '#e3f2fd'
                        e.target.style.paddingLeft = '2rem'
                        e.target.style.borderLeft = '3px solid #663399'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.paddingLeft = '1.5rem'
                        e.target.style.borderLeft = 'none'
                      }
                    }}
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

export default SidebarPersistent
