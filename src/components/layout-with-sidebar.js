import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"
import "./layout.css"

const LayoutWithSidebar = ({ children }) => {
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleButtonStyles = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 1001,
    backgroundColor: '#663399',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 15px',
    cursor: 'pointer',
    fontSize: '18px',
    boxShadow: '0 4px 12px rgba(102, 51, 153, 0.3)',
    transition: 'all 0.3s ease',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        style={toggleButtonStyles}
        onClick={toggleSidebar}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#552288'
          e.target.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#663399'
          e.target.style.transform = 'scale(1)'
        }}
        aria-label="Toggle sidebar"
      >
        <span>{sidebarOpen ? '✕' : '☰'}</span>
        <span style={{ fontSize: '12px', display: sidebarOpen ? 'none' : 'block' }}>
          เมนู
        </span>
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div style={{
        marginLeft: '0',
        transition: 'margin-left 0.3s ease',
        paddingLeft: '80px' // Space for the toggle button
      }}>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: `none`,
            padding: `0`,
            minHeight: `calc(100vh - 200px)`,
          }}
        >
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default LayoutWithSidebar
