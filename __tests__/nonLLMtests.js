const { execSync } = require('child_process');
const { version, models } = require('../config.js');

describe('index.js (nonLLMtests)', () => {
  
  test('displays welcome message if only two arguments are provided', () => {
    const output = execSync('node ./index.js').toString().trim();
    expect(output).toBe(
      'Hi! Welcome to Auto-ReadMe. For help, run this command: node index.js --h. Enjoy!'
    );
  });

  test('displays help information when --help flag is used', () => {
    const output = execSync('node ./index.js --help').toString().trim();
    expect(output).toContain('Usage: node index.js [options] [file]');
    expect(output).toContain('--version, --v     Show the current version of the program.');
    expect(output).toContain('--mc <modelNumber> Specify which model you would like to use.');
    expect(output).toContain('--model, --m       Display the model being used for the README generation.');
    expect(output).toContain('--o <filename>     Specify the output file name for the generated README.');
    expect(output).toContain('--token-usage, --t  Show the token usage for the prompt and completion.');
    expect(output).toContain('--help, --h        Show help information.');
    expect(output).toContain('Examples:');
    expect(output).toContain('node index.js example.js                  Generates a README for example.js.');
    expect(output).toContain('node index.js --help                      Shows help information.');
  });

  test('displays version information when --version flag is used', () => {
    const output = execSync('node ./index.js --version').toString().trim();
    expect(output).toBe(`version: ${version}`);
  });

  test('changes model to model 0 when --mc is used followed by 0', () => {
    const output = execSync('node ./index.js --mc 0').toString().trim();
    expect(output).toBe('Model set to: ' + models[0]);
  });

  test('uses all models available when --mc is used followed by -1', () => {
    const output = execSync('node ./index.js --mc -1').toString().trim();
    expect(output).toBe('Model set to all.');
  });

  test('gives error if user uses --mc but does not specify a model', () => {
    try {
      execSync('node ./index.js --mc').toString().trim();
    } catch (error) {
      const stderr = error.stderr.toString().trim();
      expect(stderr).toBe('Error: No model specified after --mc');
    }
  });

  test('gives error if user uses --mc but specifies a model that does not exist', () => {
    try {
      execSync(`node ./index.js --mc ${models.length+1}`).toString().trim();
    } catch (error) {
      const stderr = error.stderr.toString().trim();
      expect(stderr).toBe('Error: Model specified is not available');
    }
  });

  test('gives error if user uses --mc but does not specify an integer number after', () => {
    try {
      execSync('node ./index.js --mc abcdegf').toString().trim();
    } catch (error) {
      const stderr = error.stderr.toString().trim();
      expect(stderr).toBe('Error: Did not specify model number. Make sure to specify an integer number after --mc');
    }
  });

  test('displays current model when user uses --m, should be model 0 by default', () => {
    const output = execSync('node ./index.js --m').toString().trim();
    expect(output).toBe('model: ' + models[0]);
  });

  test('sets output file name if user uses --o', () => {
    const output = execSync('node ./index.js --o funnyfile.md').toString().trim();
    expect(output).toBe('Output file set to: funnyfile.md');
  });

  test('gives error if user uses --o but does not specify a file name', () => {
    try {
      execSync('node ./index.js --0').toString().trim();
    } catch (error) {
      const stderr = error.stderr.toString().trim();
      expect(stderr).toBe('Error: No file name specified after --o');
    }
  });
});
