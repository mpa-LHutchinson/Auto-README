const nock = require('nock');
const { createREADME, getTokenUsage } = require('../ai');

describe('LLM README Generation Tests', () => {
  it('generates README content successfully', async () => {
    const fileContents = ['console.log("Hello! I love testing!")'];
    const fileNames = ['iLoveTesting.js'];
    const modelNumber = 0;

    const readmeContent = await createREADME(fileContents, fileNames, modelNumber);

    expect(readmeContent);
  });

  it('gives an error since a model number is not provided', async () => {
    const fileContents = ['console.log("Hello! I love testing!")'];
    const fileNames = ['iLoveTesting.js'];
    const modelNumber = null;

    await expect(createREADME(fileContents, fileNames, modelNumber))
      .rejects
      .toThrow("400 {\"error\":{\"message\":\"'model' : property 'model' is missing\",\"type\":\"invalid_request_error\"}}");
  });

  it('gets the token usage from a response', async () => {
    const fileContents = ['console.log("Hello! I love tokens!")'];
    const fileNames = ['iLoveTokens.js'];
    const modelNumber = 0;

    const tokenUsage = await getTokenUsage(fileContents, fileNames, modelNumber);

    expect(tokenUsage);
  });
});
