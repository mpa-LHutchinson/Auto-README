require('dotenv').config({ path: './.env' });
const Groq = require('groq-sdk');
const fs = require('fs');
const toml = require('toml');
const {models} = require('./config');

let configFile, config;
if (fs.existsSync('./auto-README-config.toml')) {
  //check of toml config file exist
  try {
    configFile = fs.readFileSync('./auto-README-config.toml', 'utf-8');
    config = toml.parse(configFile);
  } catch (err) {
    console.error('Error in the toml file: ', err); //output an error if tiers error in the toml config file
  }
}

var api = config?.api || process.env.GROQ_API_KEY; //if toml config file has an api key, use the api in the toml file, if not use the one in the env file

const groq = new Groq({ apiKey: api });

async function createREADME(fileContents, fileNames, modelNumber) {
  const chatCompletion = await getGroqChatCompletion(
    fileContents,
    fileNames,
    modelNumber
  );
  return chatCompletion.choices[0]?.message?.content || '';
}

// Function to get Groq Chat Completion and token usage
async function getGroqChatCompletion(fileContents, fileNames, modelNumber) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content:
          'My files have this content in it: ' +
          fileContents +
          'The name of the files are ' +
          fileNames +
          ' Generate a README file for a project that uses this code.',
      },
    ],
    model: models[modelNumber],
  });

  //console.log(response.choices[0].message);
  return response;
}

// Function to retrieve token usage from the Groq API
async function getTokenUsage(fileContents, fileNames, modelNumber) {
  const response = await getGroqChatCompletion(
    fileContents,
    fileNames,
    modelNumber
  );

  return {
    prompt: response.usage?.prompt_tokens || 0, // Check for prompt tokens in the API response
    completion: response.usage?.completion_tokens || 0, // Check for completion tokens in the API response
  };
}

module.exports = { createREADME, getTokenUsage, models };
