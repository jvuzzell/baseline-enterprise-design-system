// types.js

/**
 * @typedef {Object.<string, string>} StyleRule
 * Description of the style properties for a selector, with property names and values as strings.
 */

/**
 * @typedef {Object.<string, StyleRule>} StyleRules
 * An object mapping CSS selectors to `StyleRule` objects defining specific styles.
 */

/**
 * @typedef {Object} Tag
 * @property {string} tag - The type of the tag.
 * @property {string} value - The value associated with the tag.
 */

/**
 * @typedef {Object} DesignDocToken
 * @property {string} description - Description of the style object, usually indicating its purpose or usage.
 * @property {Tag[]} tags - An array of tags providing metadata such as title, description, or specific selectors.
 * @property {StyleRules} styles - An object mapping CSS selectors to `StyleRule` objects defining specific styles.
 * @property {Object.<string, string>} scssVariables - An object mapping SCSS variable names to their values.
 * @property {Object.<string, string>} cssVariables - An object mapping CSS variable names to their values.
 */

/**
 * @example
 * // Example of a DesignDocToken for styling a footer section
 * const footerStyle = [
 *   {
 *     "description": "Description: Styles for the footer section",
 *     "tags": [
 *       {
 *         "tag": "title",
 *         "value": "Test"
 *       },
 *       {
 *         "tag": "description",
 *         "value": "This is a test"
 *       },
 *       {
 *         "tag": "filter-selector",
 *         "value": ".row.even-3--sm"
 *       },
 *       {
 *         "tag": "filter-css-var",
 *         "value": "--"
 *       },
 *       {
 *         "tag": "filter-scss-var",
 *         "value": "$"
 *       }
 *     ],
 *     "styles": {
 *       ".row.even-3--sm > [class*='col']": {
 *         "background-color": "#555",
 *         "color": "#fff",
 *         "padding": "var(--red-shift)"
 *       }
 *     },
 *     "scssVariables": {
 *       "$deep-sea": "#fff",
 *       "$makeshit": "blue"
 *     },
 *     "cssVariables": {
 *       "--foo-bar": "#fff",
 *       "--green-bar": "#fff"
 *     }
 *   }
 * ];
 */
