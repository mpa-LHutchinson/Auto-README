//This code was provided by the gorqcloud documentation. It was edited to fit this program.
// Visit https://console.groq.com/docs/quickstart

require('dotenv').config({ path: './.env' });
const Groq = require("groq-sdk");
const model = "llama3-8b-8192"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const exampleFileContent = "This file is currently under development. It will be able to multiply 2 numbers together!"

async function createREADME(fileContents, fileNames) {
  const chatCompletion = await getGroqChatCompletion(fileContents, fileNames);
  return (chatCompletion.choices[0]?.message?.content || "");
}

async function getGroqChatCompletion(fileContents, fileNames) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "My files have this content in it: " + fileContents + "The name of the files are " + fileNames + " Generate a README file for a project that uses this code.",
      },
    ],
    model: model,
  });
}

module.exports = { createREADME, model };
