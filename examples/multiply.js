//This is a simple example program that just takes 2 numbers provided by the user and multiplies them together.

//Check if the correct number of arguments is passed
if (process.argv.length !== 4) {
    console.log("Usage: node multiply.js <num1> <num2>");
    process.exit(1);
}

//Parse the command line arguments
const num1 = parseFloat(process.argv[2]);
const num2 = parseFloat(process.argv[3]);

//Check if the arguments are numbers
if (isNaN(num1) || isNaN(num2)) {
    console.log("Both arguments must be valid numbers.");
    process.exit(1);
}

//Multiply the two numbers and print the result
const result = num1 * num2;
console.log(`${num1} * ${num2} = ${result}`);
