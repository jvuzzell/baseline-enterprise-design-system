# EDS Post Processing

This Node.js script, `run-post-processes.js`, reads a JSON file that contains information about various scripts to execute along with their parameters. Let's break down how it works:

## Command Line
```bash
node run-post-processes.js
```

## Example Input - Post Processing Configuration (JSON)
The provided JSON file contains information about several scripts to execute along with their parameters. These scripts seem to be related to various post-processing tasks such as parsing comments, generating navigation data, aggregating search data, and merging JSON files.

Each script object in the JSON file contains:
    
* The path to the script file relative to the current directory.
* An array of parameters to pass to the script when executing it.
    
The run-post-processes.js script ensures that each script is executed one by one in the order specified in the JSON file, and it handles errors that may occur during script execution.

### post-process-steps.json
This file should be placed next to the run-post-process.js
```json
[
    {
        "script": "commentParser/commentParser.js",
        "parameters": ["public/assets/styles/main.css", "src/pages/docs/data"]
    },
    {
        "script": "docNavGenerator/scan-design-system-for-uri.js",
        "parameters": ["src/pages/docs/data/design-system-meta-doc.json", "./post-process/docNavGenerator/data/uri"]
    },
    {
        "script": "iconClassScanner/generate-icon-listing.js",
        "parameters": ["fak", "public/assets/styles/custom-icons.css", "./src/pages/docs/data/", "custom-icons.json"]
    }
]
```

## Post Processing Functionality

1. Reading the JSON file:
    * The script starts by reading a JSON file (post-process-steps.json) that contains an array of objects.
    * Each object in the array represents a script to execute along with its parameters.
    * The JSON file is read synchronously using the fs.readFileSync() method.
1. Resolving script paths:
    * The script resolves the paths to the scripts mentioned in the JSON file using `path.resolve()`.
    * It iterates over the array of scripts and resolves the path of each script file.
1. Executing scripts synchronously:
    * There's a function named executeScriptsSync() defined to execute scripts synchronously.
    * It takes an array of script objects as input.
    * If there are no more scripts to execute, it prints a message indicating that all scripts executed successfully.
    * Otherwise, it takes the first script from the array, executes it using execSync() from the child_process module, and passes the specified parameters.
    * If any error occurs during script execution, it catches the error and prints an error message.
    * Then, it recursively calls itself with the remaining scripts until all scripts are executed.
1. Starting script execution:
    * Finally, the script starts executing scripts synchronously by calling executeScriptsSync() with the array of resolved scripts.

