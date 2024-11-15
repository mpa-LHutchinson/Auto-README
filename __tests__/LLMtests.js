const nock = require('nock');
const fs = require('fs');
const path = require('path');
const { createREADME, getTokenUsage, loadConfig } = require('../ai');

describe('Config File Tests', () => {
  const tempFilePath = path.join(__dirname, 'temp-config.toml');

  beforeEach(() => {
    // Remove temp file before each test
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  });

  afterAll(() => {
    // Remove temp file after tests are complete
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  });

  it('Config File loads correctly', async () => {
    fs.writeFileSync(tempFilePath, 'api = "test"');
    const config = loadConfig(tempFilePath);
    expect(config.api).toBe('test');
  });

  it('Config File does not exist', async () => {
    const config = loadConfig('non-existent-file.toml');
    expect(config).toEqual({});
  });

  it('Config File is empty', async () => {
    fs.writeFileSync(tempFilePath, '');
    const config = loadConfig();
    expect(config).toEqual({});
  });
});

describe('LLM README Generation Tests', () => {
  it('generates README content successfully', async () => {
    const fileContents = ['console.log("Hello! I love testing!")'];
    const fileNames = ['iLoveTesting.js'];
    const modelNumber = 0;

    const readmeContent = await createREADME(
      fileContents,
      fileNames,
      modelNumber
    );

    expect(readmeContent);
  });

  it('gives an error since a model number is not provided', async () => {
    const fileContents = ['console.log("Hello! I love testing!")'];
    const fileNames = ['iLoveTesting.js'];
    const modelNumber = null;

    await expect(
      createREADME(fileContents, fileNames, modelNumber)
    ).rejects.toThrow(
      '400 {"error":{"message":"\'model\' : property \'model\' is missing","type":"invalid_request_error"}}'
    );
  });

  it('gets the token usage from a response', async () => {
    const fileContents = ['console.log("Hello! I love tokens!")'];
    const fileNames = ['iLoveTokens.js'];
    const modelNumber = 0;

    const tokenUsage = await getTokenUsage(
      fileContents,
      fileNames,
      modelNumber
    );

    expect(tokenUsage);
  });
});
