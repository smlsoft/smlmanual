import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <div style={{ 
      textAlign: "center", 
      padding: "4rem 2rem",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <h1 style={{ 
        fontSize: "4rem", 
        color: "#663399", 
        marginBottom: "1rem" 
      }}>
        404
      </h1>
      <h2 style={{ 
        fontSize: "1.5rem", 
        color: "#333", 
        marginBottom: "1rem" 
      }}>
        Page Not Found
      </h2>
      <p style={{ 
        fontSize: "1.1rem", 
        color: "#666", 
        marginBottom: "2rem",
        lineHeight: "1.6"
      }}>
        Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
      </p>
      <Link 
        to="/"
        style={{
          display: "inline-block",
          backgroundColor: "#663399",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "1rem",
          fontWeight: "500",
          transition: "background-color 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#552288"
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#663399"
        }}
      >
        Return to Documentation Home
      </Link>
    </div>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
