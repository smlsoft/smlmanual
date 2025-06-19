import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import GitBookSidebar from "./gitbook-sidebar"
import GitBookHeader from "./gitbook-header"
import GitBookFooter from "./gitbook-footer"
import "./gitbook-layout.css"

const GitBookLayout = ({ children, location }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const data = useStaticQuery(graphql`
    query GitBookSiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) {
        setSidebarOpen(false)
      }
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="gitbook-layout">
      {/* Mobile Header */}
      <GitBookHeader 
        siteTitle={data.site.siteMetadata?.title || `SML Documentation`}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      <div className="gitbook-container">
        {/* Sidebar */}
        <GitBookSidebar 
          isOpen={sidebarOpen || !isMobile}
          isMobile={isMobile}
          currentPath={location?.pathname}
          onToggle={toggleSidebar}
        />

        {/* Main Content */}
        <div className={`gitbook-content ${isMobile && sidebarOpen ? 'sidebar-open' : ''}`}>
          <main className="gitbook-main">
            {children}
          </main>
          
          <GitBookFooter />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div className="gitbook-overlay" onClick={toggleSidebar} />
      )}
    </div>
  )
}

export default GitBookLayout
