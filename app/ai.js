//This code was provided by the gorqcloud documentation. It was edited to fit this program.
// Visit https://console.groq.com/docs/quickstart

require('dotenv').config({ path: '../.env' });
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const exampleFileContent = "This file is currently under development. It will be able to multiply 2 numbers together!"

async function createREADME(fileContent) {
  const chatCompletion = await getGroqChatCompletion(fileContent);
  return (chatCompletion.choices[0]?.message?.content || "");
}

async function getGroqChatCompletion(fileContent) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "My file has this content in it: " + fileContent + " Write a README file for this file.",
      },
    ],
    model: "llama3-8b-8192",
  });
}

module.exports = { createREADME };
