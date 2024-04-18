const fs = require('fs');
const path = require('path');

// Object to store merged sections
const mergedSections = {};

// Function to merge JSON files
function mergeJSONFiles(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });

    files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.json') {
            const filePath = path.join(directory, file.name);
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            Object.entries(jsonData).forEach(([section, data]) => {
                if (Array.isArray(data)) {
                    if (!mergedSections[section]) {
                        mergedSections[section] = [];
                    }
                    mergedSections[section].push(...data);
                }
            });
        } else if (file.isDirectory()) {
            const subDirectoryPath = path.join(directory, file.name);
            mergeJSONFiles(subDirectoryPath);
        }
    });
}

// Usage: node merge-jsons.js <directory_path> <output_file_path>

const directoryPath = path.resolve(process.argv[2]);
const outputFilePath = path.resolve(process.argv[3] || 'merged-data.json');

// Merge JSON files
mergeJSONFiles(directoryPath);

// Prepare merged data
const mergedData = {};

Object.entries(mergedSections).forEach(([section, data]) => {
    mergedData[section] = data;
});

// Write the output file
fs.writeFile(outputFilePath, JSON.stringify(mergedData, null, 2), 'utf8', (writeErr) => {
    if (writeErr) {
        console.error(`Error writing to output file: ${writeErr} \n`);
        return;
    }

    console.log(`Merged data file generated: ${outputFilePath} \n`);
});
