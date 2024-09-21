# Auto-README


https://github.com/user-attachments/assets/4ef61766-5780-434f-8440-2d02389c977c

This README file was partially generated using GROQ API. 

This Node.js script is designed to generate a README file for a project using a model from Groq, a chat AI platform. Here's a breakdown of the script:

**Getting started**

Before using, make sure to provide an API key as an environment variable. You can either do this by creating a .env file and adding this line:

```bash
GROQ_API_KEY=<YourAPIkey>
```

or by setting it in the terminal:

```bash
$env:GROQ_API_KEY="<YourAPIkey>"
```

Once you do this, run this command:

```bash
node index.js
```

**Command-line arguments**

The script then checks for command-line arguments using `process.argv`. It supports the following options:

* `--help` or `--h`: Displays help information.
* `--version` or `--v`: Displays the current version of the script.
* `--model` or `--m`: Displays the current model being used.
* `--o <filename>`: Specifies the output file name for the generated README.
* `<filename>`: Specifies the file for which a README should be generated.

**Generating README file**

The script then checks if a file name was specified on the command line. If so, it reads the file contents using `fs.readFileSync()` and stores them in an array `fileContents`. It also stores the file names in an array `fileNames`.

Next, the script calls the `createREADME` function from the `ai.js` file, passing the `fileContents` and `fileNames` arrays as arguments. This function uses the Groq API to generate a README file based on the provided files.

**Error handling**

The script also includes error handling for cases where:

* The specified file is not found.
* The `--o` option is used without specifying a file name.
* An error occurs while generating the README file.

**Groq API integration**

The script uses the Groq API to generate the README file. It creates a `Groq` object with an API key from a `.env` file and a model selected from the `ai.js` file. The `createREADME` function is then called with the `fileContents` and `fileNames` arrays as arguments.

**Exporting functions**

Finally, the script exports the `createREADME` and `model` functions from the `ai.js` file.

Overall, this script provides a simple way to generate a README file for a project using a Groq AI model.
