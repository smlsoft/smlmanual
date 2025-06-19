# SML Documentation Website

A comprehensive documentation website built with Gatsby for SML Account and POS systems. This site automatically generates web pages from Markdown files and provides an organized, searchable interface for accessing documentation.

## Features

- **Automatic Page Generation**: Creates web pages from Markdown files in the `docs/` folder
- **Smart Categorization**: Automatically organizes documentation into categories based on content
- **Search Functionality**: Real-time search across all documentation
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Thai Language Support**: Full support for Thai language content
- **Modern UI**: Clean, professional interface with smooth interactions

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd smldocs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run develop
   ```

4. Open your browser and visit `http://localhost:8000`

### Building for Production

```bash
npm run build
npm run serve
```

## Adding New Documentation

1. Create a new Markdown file in the `docs/` folder
2. The filename should follow the pattern: `YYYY-MM-DD-Document-Title.md`
3. Write your content in Markdown format
4. The page will be automatically generated and categorized

### File Naming Convention

- Use descriptive names that include relevant keywords
- Include dates for version tracking
- Use hyphens to separate words
- Example: `2024-01-15-POS-System-Setup-Guide.md`

## Project Structure

```
├── docs/                   # Markdown documentation files
├── src/
│   ├── components/        # React components
│   ├── pages/            # Gatsby pages
│   ├── templates/        # Page templates
│   └── styles/           # CSS styles
├── gatsby-config.js      # Gatsby configuration
├── gatsby-node.js        # Node APIs for page generation
└── package.json         # Project dependencies
```

## Categories

The system automatically categorizes documentation based on keywords:

- **POS System**: Point of sale related documentation
- **SML Account**: SML Account system documentation  
- **Tom Yum Goong System**: TYG system specific guides
- **Installation & Setup**: Installation and setup guides
- **Configuration & Settings**: Configuration documentation
- **User Manuals**: User guides and manuals
- **Troubleshooting**: Problem solving and fixes
- **Reports & Forms**: Reports and forms documentation
- **Tools & Tips**: Utility tools and helpful tips

## Customization

### Styling

- Edit `src/styles/markdown.css` for markdown content styling
- Edit `src/styles/prism.css` for code syntax highlighting
- Component styles are inline for easy customization

### Adding New Categories

Edit the categorization logic in `src/pages/index.js` to add new categories or modify existing ones.

### Search

The search functionality is built-in and searches through document titles and excerpts. No external search service required.

## Technologies Used

- **Gatsby**: Static site generator
- **React**: Frontend framework
- **GraphQL**: Data querying
- **Markdown**: Content format
- **CSS**: Styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions about the documentation system, please create an issue in the repository.
