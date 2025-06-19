import React from "react"
import { Link } from "gatsby"

const GitBookHeader = ({ siteTitle, isMobile, sidebarOpen, onToggleSidebar }) => {
  return (
    <header className="gitbook-header">
      {isMobile && (
        <button 
          className="gitbook-header-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      )}
      
      <Link to="/" className="gitbook-header-title">
        📚 {siteTitle}
      </Link>
    </header>
  )
}

export default GitBookHeader
