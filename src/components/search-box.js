import React, { useState, useMemo } from "react"

const SearchBox = ({ docs, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDocs = useMemo(() => {
    if (!searchTerm.trim()) return docs

    return docs.filter(doc => {
      const title = (doc.frontmatter.title || doc.fields.title || "").toLowerCase()
      const excerpt = (doc.excerpt || "").toLowerCase()
      const searchLower = searchTerm.toLowerCase()
      
      return title.includes(searchLower) || excerpt.includes(searchLower)
    })
  }, [docs, searchTerm])

  React.useEffect(() => {
    onFilter(filteredDocs)
  }, [filteredDocs, onFilter])

  return (
    <div style={{ marginBottom: "2rem" }}>
      <input
        type="text"
        placeholder="Search documentation..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "1rem",
          fontSize: "1rem",
          border: "2px solid #e1e4e8",
          borderRadius: "8px",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#663399"
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e1e4e8"
        }}
      />
      {searchTerm && (
        <p style={{ 
          marginTop: "0.5rem", 
          color: "#666", 
          fontSize: "0.9rem" 
        }}>
          Found {filteredDocs.length} result{filteredDocs.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}

export default SearchBox
