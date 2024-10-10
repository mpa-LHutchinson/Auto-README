const fs = require('fs');
const path = require('path');
const { createREADME, models, getTokenUsage } = require('./ai');  // Ensure getTokenUsage function is available
const version = 0.1;
var readmeFileName = 'generatedFile.md';
let modelNumber = 0;

// generating the file path for the AI-generated readme file
var generatedFilePath = path.join(__dirname, readmeFileName);

// check for command line arguments

if (process.argv.length == 2){
  console.log("Hi! Welcome to Auto-ReadMe. For help, run this command: node index.js --h. Enjoy!");
  process.exit(0);
}

if (process.argv.includes('--help') || process.argv.includes('--h')) {
  console.log(`
Usage: node index.js [options] [file]

Options:
--version, --v     Show the current version of the program.
--mc <modelNumber> Specify which model you would like to use. Use 0-${models.length-1} for specific model, and use -1 to use all models.
--model, --m       Display the model being used for the README generation.
--o <filename>     Specify the output file name for the generated README.
--token-usage, --t  Show the token usage for the prompt and completion.
--help, --h        Show help information.

Examples:
node index.js example.js                  Generates a README for example.js.
node index.js --version                   Displays the current version.
node index.js --model                     Displays the current model.
node index.js example.js --o myReadme.md  Generates a README and saves it as myReadme.md.
node index.js --token-usage               Displays token usage for prompt and completion.
node index.js --help                      Shows help information.
  `);
}

if (process.argv.includes('--version') || process.argv.includes('--v')) {
    console.log("version: " + version);
}

if (process.argv.includes('--mc') || process.argv.includes('--mc')) {
  const outputIndex = process.argv.indexOf('--mc') + 1;

  if (outputIndex < process.argv.length) {
      modelNumber = parseInt(process.argv[outputIndex], 10);

      if (!Number.isInteger(modelNumber)){
        console.error("Error: Did not specify model number. Make sure to specify an integer number after --mc");
        process.exit(1);
      }
      else if (modelNumber >= models.length){
        console.error("Error: Model specified is not available");
        process.exit(1);
      }
      else if (modelNumber != -1){
        console.log("Model set to: " + models[modelNumber]);
      }
      else{
        console.log("Model set to all.");
      }

  } else {
      console.error("Error: No model specified after --mc");
      process.exit(1);
  }
}

if (process.argv.includes('--model') || process.argv.includes('--m')) {
  if (modelNumber === -1){
    console.log("model: All models");
  }
  else{
    console.log("model: " + models[modelNumber]);
  }
  
}


if (process.argv.includes('--token-usage') || process.argv.includes('--t')) {
  tokenUsageFlag = true;  // Set token usage flag
}

if (process.argv.includes('--o')) {
  const outputIndex = process.argv.indexOf('--o') + 1;

  if (outputIndex < process.argv.length) {
      readmeFileName = process.argv[outputIndex];
      generatedFilePath = path.join(__dirname, readmeFileName);
      console.log("Output file set to: " + readmeFileName);
  } else {
      console.error("Error: No file name specified after --o");
      process.exit(1);
  }
}

let fileNames = [];
let fileContents = [];
for (let i = 2; i < process.argv.length; i++) {
    if (!process.argv[i].startsWith('--') && process.argv[i-1] !== '--o' && process.argv[i-1] !== '--mc') {
        fileNames.push(process.argv[i]);
    }
}

if (fileNames.length > 0) {
  for (let fileName of fileNames){
    let filePath = path.join(__dirname, fileName);

    // checks if the specified file on the command line exists
    if (fs.existsSync(filePath)) {
        console.log(`Running file: ${fileName}`);
        fileContents.push(fs.readFileSync(filePath, 'utf8'));
    } else {
      console.error(`Error: File ${fileName} not found`);
      process.exit(1);
    }
  }

  if (modelNumber === -1){
    for (let i=0; i<models.length; i++){
      
      // calling createREADME from ai.js to generate a README file
      createREADME(fileContents, fileNames, i)
      .then(async (readmeContent) => {
        console.log("Successfully generated README with model " + models[i] +  ". Check model" + i + ".md in this directory for your new README file.");
        fs.writeFileSync(path.join(__dirname, `Model${i}.md`), readmeContent, 'utf8');

        if (process.argv.includes('--token-usage') || process.argv.includes('--t')) {
          const tokenUsage = await getTokenUsage(fileContents, readmeContent, i);  // Get token usage data
          console.error(`Token usage for ${models[i]}: ${tokenUsage.prompt} tokens in the prompt, ${tokenUsage.completion} tokens in the completion.`);
        }
      })
      .catch((error) => {
        console.error("Error generating README:", error);
      });

    }
  }
  else{
    // calling createREADME from ai.js to generate a README file
    createREADME(fileContents, fileNames, modelNumber)
    .then(async (readmeContent) => {
      console.log("Successfully generated README with model " + models[modelNumber] +"check " + readmeFileName + " in this directory for your new README file.");
      fs.writeFileSync(generatedFilePath, readmeContent, 'utf8');

      if (process.argv.includes('--token-usage') || process.argv.includes('--t')) {
        const tokenUsage = await getTokenUsage(fileContents, readmeContent, modelNumber);  // Get token usage data
        console.error(`Token usage: ${tokenUsage.prompt} tokens in the prompt, ${tokenUsage.completion} tokens in the completion.`);
      }
    })
    .catch((error) => {
      console.error("Error generating README:", error);
    });
  }

  
}

else{
  process.exit(0);
}
