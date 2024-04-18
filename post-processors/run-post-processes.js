const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Resolve the JSON file path
const jsonFile = path.resolve(__dirname, 'post-process-steps.json');
const scripts = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

// Resolve the paths to the scripts
const resolvedScripts = scripts.map((scriptInfo) => {
    const resolvedScript = path.resolve(__dirname, scriptInfo.script);
    return { ...scriptInfo, script: resolvedScript };
});

// Function to execute scripts synchronously
function executeScriptsSync(scripts) {
    if (scripts.length === 0) {
        console.log('All scripts executed successfully. \n');
        return;
    }

    const scriptInfo = scripts.shift();
    const { script, parameters } = scriptInfo;
    console.log(`>> Executing ${script} with parameters: ${parameters.join(' ')}... \n`);

    try {
        execSync(`node ${script} ${parameters.join(' ')}`);
        console.log(`Script ${script} executed successfully. \n`);
    } catch (error) {
        console.error(`Error executing ${script}: ${error.message} \n`);
    }

    executeScriptsSync(scripts); // Call next script
}

// Start executing scripts synchronously
executeScriptsSync(resolvedScripts);
