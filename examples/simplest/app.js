var MathScript = require('../../src');

var script = new MathScript(); //Create a new MathScript handler
console.log(`The result of 2+2 = ${script.execute('2 > 3')}`); //Execute a MathScript function and print the result

//If the code from the console generates an error, make sure you're using a node version that accepts ECMAScript 2015 syntaxes.