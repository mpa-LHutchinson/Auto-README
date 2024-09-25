require('dotenv').config({ path: './.env' });
const Groq = require("groq-sdk");
const models = ["llama3-8b-8192", "mixtral-8x7b-32768", "llava-v1.5-7b-4096-preview"];

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function createREADME(fileContents, fileNames, modelChange) {
  const chatCompletion = await getGroqChatCompletion(fileContents, fileNames, modelChange);
  return (chatCompletion.choices[0]?.message?.content || "");
}

// Function to get Groq Chat Completion and token usage
async function getGroqChatCompletion(fileContents, fileNames, modelChange) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "My files have this content in it: " + fileContents + "The name of the files are " + fileNames + " Generate a README file for a project that uses this code.",
      },
    ],
    model: models[modelChange],
  });

  return response;
}

// Function to retrieve token usage from the Groq API
async function getTokenUsage(fileContents, fileNames, modelChange) {
  const response = await getGroqChatCompletion(fileContents, fileNames, modelChange);

  return {
    prompt: response.usage?.prompt_tokens || 0,        // Check for prompt tokens in the API response
    completion: response.usage?.completion_tokens || 0 // Check for completion tokens in the API response
  };
}

module.exports = { createREADME, getTokenUsage, models };
