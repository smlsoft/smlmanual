import React from "react"

const GitBookFooter = () => {
  return (
    <footer className="gitbook-footer">
      <div className="gitbook-footer-links">
        <a href="https://smldocs.netlify.app/">หน้าหลัก</a>
        <a href="mailto:support@sml.com">ติดต่อสนับสนุน</a>
        <a href="/about">เกี่ยวกับเรา</a>
      </div>
      <div>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} SML Documentation - 
          สร้างด้วย <a href="https://www.gatsbyjs.com" target="_blank" rel="noopener noreferrer">Gatsby</a>
        </p>
      </div>
    </footer>
  )
}

export default GitBookFooter
