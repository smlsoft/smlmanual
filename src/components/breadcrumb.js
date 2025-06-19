import React from "react"
import { Link } from "gatsby"

const Breadcrumb = ({ currentTitle, category }) => {
  const breadcrumbStyles = {
    padding: '1rem 2rem 0.5rem 2rem',
    fontSize: '0.9rem',
    color: '#666',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: '#f8f9fa'
  }

  const linkStyles = {
    color: '#663399',
    textDecoration: 'none'
  }

  const separatorStyles = {
    margin: '0 0.5rem',
    color: '#999'
  }

  return (
    <nav style={breadcrumbStyles}>
      <Link to="/" style={linkStyles}>
        🏠 หน้าหลัก
      </Link>
      {category && (
        <>
          <span style={separatorStyles}>›</span>
          <span style={{ color: '#999' }}>{category}</span>
        </>
      )}
      {currentTitle && (
        <>
          <span style={separatorStyles}>›</span>
          <span style={{ color: '#333', fontWeight: '500' }}>{currentTitle}</span>
        </>
      )}
    </nav>
  )
}

export default Breadcrumb
