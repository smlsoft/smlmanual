import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar-persistent"
import "./layout.css"

const LayoutTwoColumn = ({ children, location }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Mobile Menu Button */}
      {isMobile && (
        <>
          <button
            onClick={toggleSidebar}
            style={{
              position: 'fixed',
              top: '20px',
              left: '20px',
              zIndex: 1002,
              backgroundColor: '#663399',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 15px',
              cursor: 'pointer',
              fontSize: '18px',
              boxShadow: '0 4px 12px rgba(102, 51, 153, 0.3)'
            }}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
          
          {sidebarOpen && (
            <div
              onClick={toggleSidebar}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1000
              }}
            />
          )}
        </>
      )}

      {/* Left Sidebar */}
      <div style={{
        width: '320px',
        position: 'fixed',
        top: 0,
        left: isMobile ? (sidebarOpen ? 0 : '-320px') : 0,
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e1e4e8',
        boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
        zIndex: 1001,
        overflow: 'auto',
        transition: 'left 0.3s ease'
      }}>
        <Sidebar currentPath={location?.pathname} />
      </div>

      {/* Right Content Area */}
      <div style={{
        flex: 1,
        marginLeft: isMobile ? 0 : '320px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        
        {/* Main Content */}
        <main style={{
          flex: 1,
          backgroundColor: '#ffffff',
          margin: '0 1rem 1rem 1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default LayoutTwoColumn
