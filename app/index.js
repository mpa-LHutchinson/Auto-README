const fs = require('fs');
const path = require('path');
const { createREADME } = require('./ai');

//generating the file path for the AI generated readme file
const generatedFilePath = path.join(__dirname, 'generatedFile.md');

//checks for command line arguments
if (process.argv.includes('--version') || process.argv.includes('--v')) {
    console.log("version 0.1");

} else if (process.argv.length > 2) {
    const fileName = process.argv[2];
    const filePath = path.join(__dirname, fileName);

    //checks if the specified file on the command line exists
    if (fs.existsSync(filePath)) {
        console.log(`Running file: ${fileName}`);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        //calling createREADME from ai.js to generate a README file
        createREADME(fileContent)
          .then((readmeContent) => {
            console.log("Successfully generated README, check generatedFile.md in this directory for your new README file.");
            fs.writeFileSync(generatedFilePath, readmeContent, 'utf8');
          })
          .catch((error) => {
            console.error("Error generating README:", error);
          });
    } else {
        console.error(`Error: File ${fileName} not found`);
    }
} else {
    console.log("Hi! Welcome to Auto-ReadMe.");
}
