const fs = require('fs');
const path = require('path');

// Get command-line arguments
const searchType = process.argv[2];
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
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading input file: ${err}`);
        return;
    }

    try {
        const inputJSON = JSON.parse(data);
        let outputJSON = {};

        switch (searchType) {
            case 'framework-aggregate':
                outputJSON = frameworkAggregator(inputJSON);
                break;
            case 'uri-aggregate':
                outputJSON = uriAggregator(inputJSON);
                break;
            case 'domain-aggregate':
                outputJSON = domainAggregator(inputJSON);
                break;
            case 'icon-aggregate':
                outputJSON = iconAggregator(inputJSON);
                break;
        }

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

function frameworkAggregator(json) {
    const convertedData = {};

    const map = json.map((item) => {
        return item.map((obj) => {
            const docType = findTag(obj, 'doc-type').value;
            const title = findTag(obj, 'title').value;

            let data = {
                [`/${docType}/#${generateURI(title)}`]: obj.tags.map((tag) => {
                    return {
                        [tag.tag]: tag.value,
                        cssVariable: JSON.stringify(obj.cssVariable) ?? undefined,
                        scssVariable: JSON.stringify(obj.scssVariable) ?? undefined,
                        styles: JSON.stringify(obj.styles) ?? undefined,
                    };
                }),
            };

            return data;
        });
    });

    map.forEach((section) => {
        section.forEach((item) => {
            const key = Object.keys(item)[0];
            convertedData[key] = item[key];
        });
    });

    return convertedData;
}

function uriAggregator(json) {
    const converted = {};

    Object.keys(json).forEach((key) => {
        json[key].forEach((item) => {
            const { title, uri } = item;
            converted[`${uri}`] = [
                {
                    title: title,
                },
            ];
        });
    });

    return converted;
}

function domainAggregator(json) {
    const converted = {};

    Object.keys(json).forEach((key) => {
        json[key].forEach((item) => {
            const { title, uri } = item;
            converted[`${uri}`] = [
                {
                    title: title,
                },
            ];
        });
    });

    return converted;
}

function iconAggregator(json) {
    let converted = {};

    json.map((item) => {
        converted[`/icons/?iconFilter=${item}`] = [{ title: item }];
    });

    return converted;
}

function findTag(obj, tagName) {
    return obj.tags.find((tag) => tag.tag === tagName);
}

function generateURI(title) {
    const lowercaseTitle = title.toLowerCase();
    const replacedTitle = lowercaseTitle.replace(/[^a-z0-9]+/g, '-');
    return replacedTitle;
}
