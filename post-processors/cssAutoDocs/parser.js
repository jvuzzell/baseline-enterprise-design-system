const { match } = require('assert');
const fs = require('fs');
const path = require('path');

// Function to parse CSS tags and generate a JSON object
function parseCssChunks(cssFilePath) {
    const cssContent = fs.readFileSync(cssFilePath, 'utf-8');
    const chunks = cssContent.split('/*--- end ---*/').slice(0, -1);
    const parsedData = [];
    chunks.forEach((chunk) => {
        let data = parseCssComments(chunk);
        if (data.length > 0) {
            parsedData.push(data);
        }
    });

    return parsedData;
}

function parseCssComments(chunk) {
    const regex = /\/\*\*([\s\S]*?)\*\//g;
    const match = regex.exec(chunk);
    const comment = match ? match[1] : '';
    const lastCharIndex = match ? match.index + match[0].length : -1;

    const styleChunk = chunk.substring(lastCharIndex);

    // Create a sub chunk between the match and the end of the chunk

    const parsedComments = [];

    const lines = comment
        .split('\n')
        .map((line) => line.trim().replace(/^\*\s?/, ''))
        .filter((line) => line !== '');

    const commentData = {
        description: '',
        tags: [],
    };

    let currentTag = null;

    lines.forEach((line) => {
        if (line.startsWith('@')) {
            const [tagName, ...tagValue] = line.substring(1).split(' ');
            const tag = {
                tag: tagName,
                value: tagValue.join(' '),
            };
            commentData.tags.push(tag);
        } else if (currentTag) {
            currentTag.value += ' ' + line;
        } else {
            commentData.description += ' ' + line;
        }
    });

    commentData.description = commentData.description.trim();
    parsedComments.push(commentData);

    // Process 'filter-css-selector' tags separately
    const cssSelectorFilterTags = parsedComments.filter((commentData) =>
        commentData.tags.some((tag) => tag.tag === 'filter-selector')
    );

    cssSelectorFilterTags.forEach((commentData) => {
        const filterTags = commentData.tags.filter((tag) => tag.tag === 'filter-selector');
        filterTags.forEach((filterTag) => {
            const filter = filterTag.value;
            const filteredCssSelectors = getStylesWithPrefix(styleChunk, filter);
            commentData.styles = { ...commentData.styles, ...filteredCssSelectors };
        });
    });

    // Process 'css-selector' tags separately
    const scssFilterTags = parsedComments.filter((commentData) =>
        commentData.tags.some((tag) => tag.tag === 'filter-scss-var')
    );

    scssFilterTags.forEach((commentData) => {
        const filterTags = commentData.tags.filter((tag) => tag.tag === 'filter-scss-var');
        filterTags.forEach((filterTag) => {
            const filter = filterTag.value;
            const filteredScssVariables = getScssVariablesWithPrefix(styleChunk, filter);
            commentData.scssVariables = { ...commentData.scssVariables, ...filteredScssVariables };
        });
    });

    const cssVariableFilterTags = parsedComments.filter((commentData) =>
        commentData.tags.some((tag) => tag.tag === 'filter-css-var')
    );

    cssVariableFilterTags.forEach((commentData) => {
        const filterTags = commentData.tags.filter((tag) => tag.tag === 'filter-css-var');
        filterTags.forEach((filterTag) => {
            const filter = filterTag.value;
            const filteredCssVariables = getCssVariablesWithPrefix(styleChunk, filter);
            commentData.cssVariables = { ...commentData.cssVariables, ...filteredCssVariables };
        });
    });

    return parsedComments;
}

function getStylesWithPrefix(stylesBlock, prefix) {
    const regex = new RegExp(`((${escapeRegex(prefix)}[^{]*)\\{([\\s\\S]*?)\\})`, 'g');

    const matches = [...stylesBlock.matchAll(regex)];
    const styles = {};

    for (const match of matches) {
        const selector = match[2].trim();
        const styleBlock = match[3];
        const propertiesArr = styleBlock.split(';').filter((property) => property.trim() !== '');

        propertiesArr.forEach((property) => {
            const [name, value] = property.split(':').map((item) => item.trim());

            if (name && value) {
                styles[selector] = styles[selector] || {};
                styles[selector][name] = value;
            }
        });
    }

    return styles;
}

function getScssVariablesWithPrefix(stylesBlock, prefix) {
    const scssVariables = {};

    // Extract Sass variables outside CSS blocks
    const sassVariableRegex = /\$([\w-]+)\s*:\s*([^;]+);/g;
    let match;
    while ((match = sassVariableRegex.exec(stylesBlock))) {
        const variableName = `$${match[1].trim()}`;
        const value = match[2].trim();

        // Store the Sass variable in the scssVariables object
        scssVariables[variableName] = value;
    }

    // Filter the scssVariables object for keys that start with the prefix
    const filteredVariables = Object.fromEntries(
        Object.entries(scssVariables).filter(([key]) => key.startsWith(prefix))
    );

    return filteredVariables;
}

function getCssVariablesWithPrefix(stylesBlock, prefix) {
    const cssVariables = {};

    // Extract CSS variables within CSS blocks
    const cssVariableRegex = /\--([\w-]+)\s*:\s*([^;]+);/g;

    let cssVariableMatch;
    while ((cssVariableMatch = cssVariableRegex.exec(stylesBlock))) {
        const variableName = `--${cssVariableMatch[1].trim()}`;
        const value = cssVariableMatch[2].trim();

        // Store the CSS variable in the cssVariables object
        cssVariables[variableName] = value;
    }

    // Filter the cssVariables object for keys that start with the prefix
    const filteredVariables = Object.fromEntries(
        Object.entries(cssVariables).filter(([key]) => key.startsWith(prefix))
    );

    return filteredVariables;
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Usage
const cssFilePath = path.resolve(process.argv[2]); // Get the file path from command line argument
const parsedData = parseCssChunks(cssFilePath);
const output = JSON.stringify(parsedData, null, 2);

const outputDirectory = process.argv[3] !== undefined ? path.resolve(process.argv[3]) : path.resolve('./data');
const outputFilePath = path.join(outputDirectory, 'design-system-meta-doc.json');

try {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
        console.log(`Created directory: ${outputDirectory}`);
    }

    fs.writeFileSync(outputFilePath, output, 'utf-8');
    console.log(`Parsed data saved to: ${outputFilePath}`);
} catch (error) {
    console.error(`Error occurred while saving the file: ${error}`);
}
