# RCE Starter App w/ Build Process
Welcome to the RCE App Starter project, a robust development template for building scalable and efficient web applications using HTML, CSS, and JavaScript with the power of Webpack and npm. 

## Demo
![RCE Framework Demo](/docs/assets/20240413_rce-basic-site-demo.gif "RCE Framework Demo")

## Features

- **SASS for styles**: Organized into functional stylesheets for easy maintenance.
- **Component-based architecture**: Modular JavaScript for scalable development.
- **Automated builds**: Configured Webpack to handle assets, styles, and transpilation.
- **Hot reloading**: Streamlines the development process by reloading only parts of the application that change.

The RCE App Starter contains a SCSS style guide (framework) and a Javascript state management framework named RCE. 

- Documentation regarding the SCSS style guide is pending. Please check back soon. 
- To learn more about the RCE Javascript framework please visit: 
https://github.com/jvuzzell/RCE-Framework


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

### Running the Project

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

### Development

#### Adding a New Page
Create a new HTML and corresponding JS file in the `src/pages/` directory.

#### Styles
Base styles, utilities, components, and layout-specific styles are placed in respective folders within `src/styles/`.
Use the `main.scss` file to import other stylesheets.

#### Components
JavaScript components are located in `src/components/`.
Each component should be modular and reusable across different parts of the application.

To learn how to use the RCE framework, review the documentation here: https://github.com/jvuzzell/RCE-Framework.