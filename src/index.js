var Parser = require('./parser');


var parser = new Parser('( (5 + 2) + 3) * ( 9 - 2 )');
console.log(parser.execute().result);