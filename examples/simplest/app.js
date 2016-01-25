var MathScript = require('../../src');

var script = new MathScript(); //Create a new MathScript handler
console.log(`The result of 2+2 = ${script.execute('2+2')}`); //Execute a MathScript function and print the result
console.log(`More complex formulas: ${script.execute('{ [ (2 + 3) * 3 ] - 10 } << 1')}`);
//The result of 2+2 = 4
//More complex formulas: 10