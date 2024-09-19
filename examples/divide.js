//This is a simple example program that just takes 2 numbers provided by the user and divides them.

//Check if the correct number of arguments is passed
if (process.argv.length !== 4) {
    console.log("Usage: node divide.js <num1> <num2>");
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

//Check for division by zero
if (num2 === 0) {
    console.log("Error: Division by zero is not allowed.");
    process.exit(1);
}

//Divide the two numbers and print the result
const result = num1 / num2;
console.log(`${num1} / ${num2} = ${result}`);
