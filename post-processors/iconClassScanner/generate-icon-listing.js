const fs = require('fs');
const path = require('path');

// Get command-line arguments
const iconPrefix = process.argv[2];
const inputFile = path.resolve(process.argv[3]);
const outputFolder = path.resolve(process.argv[4]) || 'data';
const outputFilename = process.argv[5];

// Check if input file is provided
if (!inputFile) {
    console.error('Input file is required.');
    console.log('Usage: node script.js <inputFile> [outputFolder]');
    process.exit(1);
}

// Read the input file
fs.readFile(inputFile, 'utf8', (err, cssContent) => {
    if (err) {
        console.error(`Error reading input file: ${err}`);
        return;
    }

    try {
        let outputJSON = {};

        outputJSON = iconAggregator(iconPrefix, cssContent);

        const outputFilepath = path.join(outputFolder, outputFilename);

        // Create the output folder if it doesn't exist
        fs.mkdir(outputFolder, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
                console.error(`Error creating output folder: ${mkdirErr}`);
                return;
            }

            const outputData = JSON.stringify(outputJSON, null, 2);

            // Write the output file
            fs.writeFile(outputFilepath, outputData, 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error(`Error writing to output file: ${writeErr} \n`);
                    return;
                }

                console.log(`Output file generated: ${outputFilepath} \n`);
            });
        });
    } catch (parseErr) {
        console.error(`Error parsing input JSON: ${inputFile} \n`, '>>' + parseErr.message + '\n');
    }
});

const iconAggregator = function (prefix, cssContent) {
    const lines = cssContent
        .split('\n')
        .map((line) => line.trim().replace(/^\*\s?/, ''))
        .filter((line) => line !== '');

    const regex = new RegExp(`\\.${prefix}\.([^:]+):before`);

    let iconNames = lines.filter((line) => {
        const match = line.match(regex);
        if (match) return line[1];
    });

    return iconNames.map((name) => {
        return name.match(regex)[1];
    });
};
