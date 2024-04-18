const fs = require('fs');
const path = require('path');

// Get command-line arguments
const inputFile = path.resolve(process.argv[2]);
const outputFolder = path.resolve(process.argv[3]) || 'data';

// Check if input file is provided
if (!inputFile) {
    console.error('Input file is required.');
    console.log('Usage: node script.js <inputFile> [outputFolder]');
    process.exit(1);
}

// Read the input file
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading input file: ${err}`);
        return;
    }

    try {
        const inputJSON = JSON.parse(data);
        const outputJSON = {};

        for (const item of inputJSON) {
            const docType = item[0].tags.find((tag) => tag.tag === 'doc-type').value;
            const group = outputJSON[docType] || [];
            const titles = item
                .filter((obj) => obj.tags.find((tag) => tag.tag === 'title'))
                .map((obj) => ({
                    title: obj.tags.find((tag) => tag.tag === 'title').value,
                    uri: `#${generateURI(obj.tags.find((tag) => tag.tag === 'title').value)}`,
                }));
            group.push(...titles);
            outputJSON[docType] = group;
        }

        // Create the output folder if it doesn't exist
        fs.mkdir(outputFolder, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
                console.error(`Error creating output folder: ${mkdirErr}`);
                return;
            }

            const outputFilename = path.join(outputFolder, 'uri-list_design-system.json');
            const outputData = JSON.stringify(outputJSON, null, 2);

            // Write the output file
            fs.writeFile(outputFilename, outputData, 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error(`Error writing to output file: ${writeErr} \n`);
                    return;
                }

                console.log(`Output file generated: ${outputFilename} \n`);
            });
        });
    } catch (parseErr) {
        console.error(`Error parsing input JSON: ${inputFile} \n`);
    }
});

function generateURI(title) {
    const lowercaseTitle = title.toLowerCase();
    const replacedTitle = lowercaseTitle.replace(/[^a-z0-9]+/g, '-');
    return replacedTitle;
}
