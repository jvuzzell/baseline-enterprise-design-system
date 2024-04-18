const fs = require('fs');
const path = require('path');

function scanSubfolders(directory) {
    const subfolders = fs
        .readdirSync(directory, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => ({
            title: dirent.name,
            uri: `/${dirent.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        }));

    return subfolders;
}

function generateOutput(directory, folderName) {
    const output = {
        [folderName]: scanSubfolders(directory),
    };

    return JSON.stringify(output, null, 2);
}

// Usage: node subfolder-scan.js <target_directory> <output_file_path>

const targetDirectory = path.resolve(process.argv[2]);
const outputFilePath = path.resolve(process.argv[3] || 'data/');

// Extract the folder name from the targetDirectory
const folderName = path.basename(targetDirectory);

outputFilename = path.join(outputFilePath, `uri-list_${folderName}.json`);
// throw new Error(`${outputFilename}`);
const outputData = generateOutput(targetDirectory, folderName);

// Write the output file
fs.writeFile(outputFilename, outputData, 'utf8', (writeErr) => {
    if (writeErr) {
        console.error(`Error writing to output file: ${writeErr} \n`);
        return;
    }

    console.log(`Output file generated: ${outputFilename} \n`);
});

console.log(`Output JSON file generated: ${outputFilename} \n`);
