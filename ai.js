require('dotenv').config({ path: './.env' });
const Groq = require("groq-sdk");
const model = "llama3-8b-8192"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function createREADME(fileContents, fileNames) {
  const chatCompletion = await getGroqChatCompletion(fileContents, fileNames);
  return (chatCompletion.choices[0]?.message?.content || "");
}

// Function to get Groq Chat Completion and token usage
async function getGroqChatCompletion(fileContents, fileNames) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "My files have this content in it: " + fileContents + "The name of the files are " + fileNames + " Generate a README file for a project that uses this code.",
      },
    ],
    model: model,
  });

  return response;
}

// Function to retrieve token usage from the Groq API
async function getTokenUsage(fileContents, fileNames) {
  const response = await getGroqChatCompletion(fileContents, fileNames);

  return {
    prompt: response.usage?.prompt_tokens || 0,        // Check for prompt tokens in the API response
    completion: response.usage?.completion_tokens || 0 // Check for completion tokens in the API response
  };
}

module.exports = { createREADME, getTokenUsage, model };
