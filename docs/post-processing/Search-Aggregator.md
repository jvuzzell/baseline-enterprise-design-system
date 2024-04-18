
# Table of Contents
1. [Search Aggregator Overview]()
1. [How this Script (Should) Work](#how-this-script-should-work)
1. [Script Usage - Search Aggregator Functions]()
1. [Framework Aggregator]()
1. [URI Aggregator]()
1. [Domain Aggregator]()
1. [Icon Aggregator]()

# Search Aggregator Overview

This script, `search-aggregator.js`, is a Node.js script designed to aggregate data from a series of JSON inputs based on different search types specified via command-line arguments. The output of this script provides the **Enterprise Design System (EDS)** with several JSON-based index that power the search components throughout the application.

### Search Aggregator Output - JSON
```json
{
  "/demos/accordions": [
    {
      "title": "accordions"
    }
  ],
  "/demos/alerts": [
    {
      "title": "alerts"
    }
  ],
  "/demos/buttons": [
    {
      "title": "buttons"
    }
  ]
}
```

### Enterprise Design System (EDS) - User Interface
![Search Result Example](search-result-example.png)


# How this Script (Should) Work
Note: If you alter the scripts functionality, then you need to update this documentation as well.

### 1. Importing Modules
```javascript
const fs = require('fs');
const path = require('path');
```
* fs: This module provides an API for interacting with the file system.
* path: This module provides utilities for working with file and directory paths.

### 2. Parsing Command-line Arguments
```javascript
const searchType = process.argv[2];
const inputFile = path.resolve(process.argv[3]);
const outputFolder = path.resolve(process.argv[4]) || 'data';
const outputFilename = process.argv[5];
```
* `process.argv`: An array containing the command-line arguments passed when the Node.js process was launched.

### 3. Input File Validation
```javascript
if (!inputFile) {
    console.error('Input file is required.');
    console.log('Usage: node script.js <inputFile> [outputFolder]');
    process.exit(1);
} 
```
* If the input file is not provided, the script prints an error message and exits.

### 4. Reading Input File
```javascript
fs.readFile(inputFile, 'utf8', (err, data) => {
    // Error handling and processing of input data
});
```
* Reads the input file asynchronously. Upon completion, the provided callback function is executed.

### 5. Parsing Input JSON
```javascript
const inputJSON = JSON.parse(data);
```
* Parses the input data (assumed to be in JSON format) into a JavaScript object.

### 6. Switch Statement Search Type
```javascript
switch (searchType) {
    case 'framework-aggregate':
        // Calls frameworkAggregator function
        break;
    case 'uri-aggregate':
        // Calls uriAggregator function
        break;
    case 'domain-aggregate':
        // Calls domainAggregator function
        break;
    case 'icon-aggregate':
        // Calls iconAggregator function
        break;
}
```
* Based on the searchType argument, calls different aggregation functions.

### 7. Aggregation Functions
* `frameworkAggregator`, `uriAggregator`, `domainAggregator`, and `iconAggregator` functions process the input JSON data and return aggregated results based on different criteria.

### 8. File Writing
```javascript
fs.writeFile(outputFilepath, outputData, 'utf8', (writeErr) => {
    // Error handling and completion message
});
```
* Writes the aggregated data to an output file.

### 9. Utility Functions
* `findTag`: Finds a specific tag within an object's tags array.
* `generateURI`: Generates a URI based on a given title.

# Script Usage - Search Aggregator Functions

These functions extract data from other JSON into a [format](#search-aggregator-output---json) consumable by EDS search components:

## Framework Aggregator 
Consumes the `design-system-meta-doc.json` to create search terms that support the documentation of the CSS Framework, Design Tokens, and Demos
1. To run the `frameworkAggregator(json)`, the `cssAutoDocs/parser.js` **[CSS-Autodocs](https://github.com/jvuzzell/CSS-AutoDocs/edit/main/README.md)** post-process needs to have generated the `design-system-meta-doc.json`
    * Example output- `design-system-meta-doc.json` from **CSS-AutoDocs:**
        ```json
            [
                {
                    "description": "Description: Styles for the footer section",
                    "tags": [
                    {
                        "tag": "title",
                        "value": "Test"
                    },
                    {
                        "tag": "description",
                        "value": "This is a test"
                    },
                    {
                        "tag": "filter-selector",
                        "value": ".row.even-3--sm"
                    },
                    {
                        "tag": "filter-css-var",
                        "value": "--"
                    },
                    {
                        "tag": "filter-scss-var",
                        "value": "$"
                    }
                    ],
                    "styles": {
                    ".row.even-3--sm > [class*='col']": {
                        "background-color": "#555",
                        "color": "#fff",
                        "padding": "var(--red-shift)"
                    }
                    },
                    "scssVariables": {
                    "$deep-sea": "#fff",
                    "$makeshit": "blue"
                    },
                    "cssVariables": {
                    "--foo-bar": "#fff",
                    "--green-bar": "#fff"
                    }
                }
            ]
        ```
1. Usage of the FrameworkAggregator with the `run-post-processes.js`
    * Add the following parameters object to the `process-config.json` 
        ```json
        {
            "script": "searchAggregate/search-aggregator.js",
            "parameters": [
                "<searchType>",
                "<inputFile>",
                "[outputFile]",
                "[outputFilename]"
            ]
        },
        {
            "script": "searchAggregate/search-aggregator.js",
            "parameters": [
                "framework-aggregate",
                "./src/pages/docs/data/design-system-meta-doc.json",
                "./post-process/docNavGenerator/data/search-aggregates/",
                "search-aggregate_design-system.json"
            ]
        }
        ```
    * In your command line, run
        ```bash
        npm run post-process
        ```
1. You can run the `frameworkAggregator(json)` directly via command line with the following command: 
    ```bash
    # node searchAggregate/search-aggregator.js <searchType> <inputFile> [outputFolder] [outputFilename]

    node searchAggregate/search-aggregrator.js "framework-aggregate" \
        "./src/pages/docs/data/design-system-meta-doc.json" \
        "./post-process/docNavGenerator/data/search-aggregates/" \
        "search-aggregate_design-system.json"
    ```

## URI Aggregator
Consumes output from the `docNavGenerator.js`, namely the `uri-list_demo.json`

1. To run the `uriAggregrator(json)`, the `docNavGenerator/<scan-elements-for-uri>.js` post-process(es) need to have generated the `docNavGenerator/data/uri/<uri-list>.json`. 

    * **Sample schema** that the `uriAggregator(json)` expects- this example was taken from the `docNavGenerator/data/uri/uri-list_demos.json` 
        ```json
        {
            "demo": [
                {
                    "title": "accordions",
                    "uri": "/accordions"
                },
                {
                    "title": "alerts",
                    "uri": "/alerts"
                }
            ]
        }
        ```

1. Usage of the URI Aggregator with the `run-post-processes.js`
    * Add the following parameters object to the `process-config.json` 
         ```json
        {
            "script": "searchAggregate/search-aggregator.js",
            "parameters": [
                "<searchType>",
                "<inputFile>",
                "[outputFile]",
                "[outputFilename]"
            ]
        },
        {
            "script": "searchAggregate/search-aggregator.js",
            "parameters": [
                "uri-aggregate",
                "./post-process/docNavGenerator/data/uri/uri-list_demos.json",
                "./post-process/docNavGenerator/data/search-aggregates/",
                "search-aggregate_demos.json"
            ]
        }
         ```
    * In your command line, run
        ```bash
        npm run post-process
        ```

1. You can run the `uriAggregator(json)` directly via command line with the following command: 
    ```bash
    # node searchAggregate/search-aggregator.js <searchType> <inputFile> [outputFolder] [outputFilename]

    node searchAggregate/search-aggregrator.js "uri-aggregate" \
        "./post-process/docNavGenerator/data/uri/uri-list_demos.json" \
        "./post-process/docNavGenerator/data/search-aggregates/" \
        "search-aggregate_demos.json"
    ```

## Domain Aggregator
Consumes output from the `docNavGenerator.js`, namely the `uri-list_additional-links.json`

1. To run the `domainAggregrator(json)`, the `docNavGenerator/<scan-elements-for-uri>.js` post-process(es) need to have generated the `docNavGenerator/data/uri/<uri-list>.json`. 

    * **Sample schema** that the `domainAggregator(json)` expects- this example was taken from the `docNavGenerator/data/uri/uri-list_demos.json` 
        ```json
        {
            "figma-guidelines": [
                {
                    "title": "Logos",
                    "uri": "https://www.figma.com/proto/"
                }
            ],
            "Font Awesome": [
                {
                    "title": "Custom Kit",
                    "uri": "/docs/icons/"
                }
            ]
        }
        ```

1. Usage of the Domain Aggregator with the `run-post-processes.js`
    * Add the following parameters object to the `process-config.json` 
         ```json
        {
            "script": "searchAggregate/search-aggregator.js",
            "parameters": [
                "<searchType>",
                "<inputFile>",
                "[outputFile]",
                "[outputFilename]"
            ]
        },
        {
            "script": "searchAggregate/search-aggregator.js",
            "parameters": [
                "domain-aggregate",
                "./post-process/docNavGenerator/data/uri/uri-list_additional-links.json",
                "./post-process/docNavGenerator/data/search-aggregates/",
                "search-aggregate_figma-guidelines.json"
            ]
        }
         ```
    * In your command line, run
        ```bash
        npm run post-process
        ```

1. You can run the `domainAggregator(json)` directly via command line with the following command: 
    ```bash
    # node searchAggregate/search-aggregator.js <searchType> <inputFile> [outputFolder] [outputFilename]

    node searchAggregate/search-aggregrator.js "domain-aggregate" \
    "./post-process/docNavGenerator/data/uri/uri-list_additional-links.json" \
    "./post-process/docNavGenerator/data/search-aggregates/" \
    "search-aggregate_figma-guidelines.json"
    ```

## Icon Aggregator
Consumes output from the `utilities/scan-font-awesome-icons.js`, namely the `custom-icons.json`

1. To run the `iconAggregrator(json)`, the `docNavGenerator/<scan-elements-for-uri>.js` post-process(es) need to have generated the `docNavGenerator/data/uri/<uri-list>.json`. 

    * **Sample schema** that the `iconAggregator(json)` expects- this example was taken from the `docNavGenerator/data/uri/uri-list_demos.json` 
        ```json
        [
            "fa-1-free-month-light",
            "fa-1-free-month-solid",
            "fa-10-hr-light",
            "fa-10-hr-solid",
            "fa-12-hr-light",
            "fa-12-hr-solid"
        ]
        ```

1. Usage of the Icon Aggregator with the `run-post-processes.js`
    * Add the following parameters object to the `process-config.json` 
         ```json
        {
            "script": "searchAggregate/search-aggregator.js",
            "parameters": [
                "<searchType>",
                "<inputFile>",
                "[outputFile]",
                "[outputFilename]"
            ]
        },
        {
            "script": "searchAggregate/search-aggregator.js",
            "parameters": [
                "icon-aggregate",
                "src/pages/docs/data/custom-icons.json",
                "./post-process/docNavGenerator/data/search-aggregates/",
                "search-aggregate_font-awesome-icons.json"
            ]
        },
         ```
    * In your command line, run
        ```bash
        npm run post-process
        ```

1. You can run the `iconAggregator(json)` directly via command line with the following command: 
    ```bash
    # node searchAggregate/search-aggregator.js <searchType> <inputFile> [outputFolder] [outputFilename]

    node searchAggregate/search-aggregrator.js "icon-aggregate" \
    "src/pages/docs/data/custom-icons.json" \
    "./post-process/docNavGenerator/data/search-aggregates/" \
    "search-aggregate_font-awesome-icons.json"
    ```