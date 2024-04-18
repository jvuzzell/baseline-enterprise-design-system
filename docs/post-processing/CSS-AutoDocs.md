# CSS AutoDocs
CSS AutoDocs allows us to write comments in your code, retrieve those comments, and store them as JSON for further use in a documentation site. Works within SASS, SCSS, or LESS.

CSS AutoDocs uses tags prefixed by the `@` symbol for filtering and providing metadata that describes a series of CSS attributes.

## Usage
Requires Node. 

1. Command line
```bash
node parser.js input.css output_directory
```
2. Outputs data to `output/design-system-meta-doc.json`

## Stylesheet Filtering

CSS AutoDocs will use the following tags to perform regex matching target CSS attributes to include in the documetation. 

### Usage
1. Add tags to the opening CSS comment block that you want the filter to describe
2. Add `/*--- end ---*/` at the end of the series of CSS attributes that you want the filter to apply to

### Tags

|Tag|Description|
|---|-----------|
|**filter-selector**|Filters CSS styles into your JSON based on a partial or exact match|
|**filter-css-var**|Filters CSS variables into your JSON based on a partial or exact match|
|**filter-scss-var**|Filters SCSS variables into your JSON based on a partial or exact match|


## Template Engine Meta Tags (Optional)
The following tags can be used with the CSS AutoDocs templating engine to generate webpages but they are not mandatory.Create your own attributes. 

|Tag|Description|
|---|-----------|
|**description**|Description of the styles you are documenting|
|**title**|Title of the styles you are documenting|
|**characteristics**|A list of characteristics describing the styles are documenting|
|**doc-category**|Used in the application to filter where the given documentation will be displayed. Expected values [`css-framework`,`design-tokens`]|
|**doc-type**|Category and classification of the documentation|
|**uri-demo-page**|Link to original version 1 documentation|
|**uri-related-links**|Link to other internal resources, links, and external Figma resources|
|**uri-example-iframe**|Reference to iframes stored leveraged in the display of documentation|


## Sample Input
```SCSS
/**
 * Description: Styles for the footer section
 * @title Test
 * @description This is a test
 * @filter-selector .row.even-3--sm
 * @filter-css-var --
 * @filter-scss-var $
 */

:root {
  --foo-bar: #fff;
  --green-bar: #fff;
}

$deep-sea: #fff;
$makeshit: blue;

.row.even-3--sm > [class*='col'] {
  background-color: #555;
  color: #fff;
  padding: var(--red-shift);
}

.footer > .footer-container {
  background-color: #555;
  color: #fff;
  padding: var(--red-shift);
}

.footer .footer-link {
  color: #fff;
  text-decoration: none;
}

/*--- end ---*/
```

## Sample Output
```JSON
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