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
        const outputJSON = { storybook: [] };

        for (const key in inputJSON.stories) {
            const story = inputJSON.stories[key];
            const storyId = story.id;
            const urlPath = `/storybook/?path=/docs/${storyId}`;

            if (!outputJSON.storybook[urlPath]) {
                outputJSON.storybook[urlPath] = [];
            }

            outputJSON.storybook.push({ title: story.title + ', (' + story.name + ')', uri: urlPath });
        }

        // Create the output folder if it doesn't exist
        fs.mkdir(outputFolder, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
                console.error(`Error creating output folder: ${mkdirErr}`);
                return;
            }

            const outputFilename = path.join(outputFolder, 'uri-list_storybook.json');
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
