var Parser = require('./parser');

function MathScript() {

}

/**
 * Executes a MathScript expression
 * @param expression - The MathScript expression
 * @returns {Number} - The result of the expression
 */
MathScript.prototype.execute = function execute(expression) {
    var parser = new Parser(expression);
    return parser.execute().result;
};

module.exports = MathScript;