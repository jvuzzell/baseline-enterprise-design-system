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
