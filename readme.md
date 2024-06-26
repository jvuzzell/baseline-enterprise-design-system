# WIP - Baseline Enterprise Design System (BEDS)
Welcome to the Enterprise Design System project, a robust development template for building scalable and efficient web applications using HTML, CSS, and JavaScript with the power of Webpack and npm. 
 
## Table of Contents
1. [Features](#features)
1. [Project Structure](#project-structure)
1. [Getting Started](#getting-started)
1. [Usage](#usage)
1. [Development](#development)

## Additional Documentation
1. [SCSS Development](docs/scss-development/scss-framework.md)
1. [Post Processing Overview](docs/post-processing/Post-Processing-Overview.md)
1. [CSS Auto Docs](docs/post-processing/CSS-AutoDocs.md)
1. [EDS Nav Generator](docs/post-processing/EDS-Nav-Generator.md)
1. [Search Aggregator](docs/post-processing/Search-Aggregator.md)
1. [CSS Icon Class Scanner](docs/post-processing/CSS-Icon-Class-Scanner.md)

## Demo
![EDS Framework Demo](/docs/assets/20240418_eds-basic-site-demo.jpg "EDS Framework Demo")

## Features

- **SASS for styles**: Organized into functional stylesheets for easy maintenance.
- **Component-based architecture**: Modular JavaScript for scalable development.
- **Automated builds**: Configured Webpack to handle assets, styles, and transpilation.
- **Hot reloading**: Streamlines the development process by reloading only parts of the application that change.


## Project Structure 

```bash
.
├── deploy
├── package.json                           # Project Entry Point 
├── readme.md                              # Documentation and Usage
├── post-processors
│   ├── cssAutoDocs                        # Parses Comments in CSS to JSON       
│   ├── docNavGenerator                    # Generators for Creating the Doc Site Navigation
│   ├── iconClassScanner                   # Generates a List of Icon Names
│   ├── searchAggregate                    # Generates a JSON of Search Terms and Destinations
│   ├── post-process-steps.json            # Manifest and sequence of Post Processes
│   ├── run-post-processes.js              # Run `npm run post-process` to trigger
│   └── utilities                          # Scripts commonly shared between post processors
├── docs
│   └── post-processing                    # Documentation and Usage for Post Process scripts       
│       ├── Post-Processing-Overview.md 
│       ├── EDS-Nav-Generator.md 
│       ├── CSS-AutoDocs.md 
│       ├── CSS-Icon-Class-Scanner.md 
│       └── Search-Aggregator.md 
├── src
│   ├── assets                             # Static Assets
│   ├── components                         # Reusuable RCE Components
│   ├── main.js                            # Common JS utilities
│   ├── pages
│   │   ├── index.html                     # Entry Point from Webpages
│   │   ├── index.js                       # Page Specific JS
│   │   └── readme/                        # Additional page
│   └── styles                             # SCSS Framework
│       ├── abstracts
│       ├── base
│       ├── components
│       ├── functions
│       ├── layout
│       ├── main.scss                       # SCSS Entry Point
│       └── utilities
└── webpack.config.js                       # Preprocessors for HTML, SCSS, and JS
```

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine. If not, you can download and install it from [Node.js official site](https://nodejs.org/).

### Setup

Clone the repository and install dependencies:

```bash
git clone [repository-url]
cd rce-app-starter
npm install
```

## Usage

- **Development mode:** This will start a dev server with hot reloading.
```bash
npm start
``` 
- **Build the project:** This will compile all resources for production into the `public` directory. 
```bash
npm run build
```

- **Watch Mode:** Listens for any changes and rebuilds the project as needed.
```bash
npm run watch
```

- **Deploy:** Run the deployment script.
```bash
npm run deploy
```

## Development

### Adding a New Page
Create a new HTML and corresponding JS file in the `src/pages/` directory.

### Styles
Base styles, utilities, components, and layout-specific styles are placed in respective folders within `src/styles/`.
Use the `main.scss` file to import other stylesheets.

### Components
JavaScript components are located in `src/components/`.
Each component should be modular and reusable across different parts of the application.

## Notes 
The EDS user interface is powered by the RCE framework. To learn how to use the RCE framework, review the documentation here: https://github.com/jvuzzell/RCE-Framework.