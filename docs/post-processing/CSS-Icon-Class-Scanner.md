# CSS Icon Class Scanner

This script is designed to parse a CSS file containing icon classes to generate a JSON file listing the names of the icons. Here's a breakdown of what it does:

## Example
**Command line**
```bash
node iconClassScanner/generate-icon-listing.js <iconPrefix> <inputFile> [outputFolder] <outputFilename>
```

**Input**: CSS file
```css
.fak.fa-1-free-month-light:before,
.fa-kit.fa-1-free-month-light:before {
  content: "\e0da";
}

.fak.fa-1-free-month-solid:before,
.fa-kit.fa-1-free-month-solid:before {
  content: "\e040";
}
```

**Output**: < outputFilename >.json
```json
[
  "fa-1-free-month-light",
  "fa-1-free-month-solid",
  "fa-10-hr-light",
  "fa-10-hr-solid"
]
```

## Functionality

1. **Command-line Arguments**: It accepts four command-line arguments:
    * `iconPrefix`: Prefix used for icon class names.
    * `<inputFile>`: Path to the input CSS file.
    * [`outputFolder`] (optional): Path to the output folder where the generated JSON file will be saved. If not provided, it defaults to a folder named 'data'.
    * `outputFilename`: Name of the output JSON file.
1. **Reading Input File**: It reads the content of the input CSS file specified in the command-line arguments.
1. **Icon Aggregation**:
    * It defines a function iconAggregator(prefix, cssContent) that takes the icon prefix and CSS content as input.
    * It splits the CSS content into lines, trims each line, and removes empty lines.
    * It constructs a regular expression based on the provided icon prefix to match icon class names.
    * It extracts icon class names from the CSS content using the regular expression.
    * It returns an array of icon names.
1. **Processing Input Data**:
    * It calls the iconAggregator function with the provided icon prefix and CSS content.
    * It generates an object outputJSON containing the icon names.
1. **Creating Output Folder**: It creates the output folder if it doesn't exist.
1. **Writing Output File**: It generates a new JSON file with the provided output filename in the output folder.
    * The content of the output JSON file is an array of icon names.
    * The output JSON file is saved in the specified output folder.
