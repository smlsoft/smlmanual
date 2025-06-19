import React from "react"
import { Link } from "gatsby"

const GitBookBreadcrumb = ({ currentTitle, category }) => {
  return (
    <nav className="gitbook-breadcrumb">
      <Link to="/">🏠 หน้าหลัก</Link>
      {category && (
        <>
          <span className="gitbook-breadcrumb-separator">›</span>
          <span>{category}</span>
        </>
      )}
      {currentTitle && (
        <>
          <span className="gitbook-breadcrumb-separator">›</span>
          <span style={{ color: '#333', fontWeight: '500' }}>{currentTitle}</span>
        </>
      )}
    </nav>
  )
}

export default GitBookBreadcrumb
