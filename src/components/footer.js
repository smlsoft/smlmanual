import React from "react"

const Footer = () => {
  return (
    <footer style={{
      marginTop: "4rem",
      padding: "2rem",
      backgroundColor: "#f8f9fa",
      borderTop: "1px solid #e1e4e8",
      textAlign: "center"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ 
          margin: "0 0 1rem 0", 
          color: "#666", 
          fontSize: "0.9rem" 
        }}>
          SML Documentation - Complete guide for SML Account and POS systems
        </p>
        <p style={{ 
          margin: "0", 
          color: "#999", 
          fontSize: "0.8rem" 
        }}>
          Built with Gatsby • Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

export default Footer
