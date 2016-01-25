var Parser = require('./parser');
var Context = require('./context');

function MathScript() {
    this.context = new Context();
}

/**
 * Executes a MathScript expression
 * @param expression - The MathScript expression
 * @returns {Number} - The result of the expression
 */
MathScript.prototype.execute = function execute(expression) {
    var parser = new Parser(expression, this.context);
    var result = parser.execute();
    if (result && result.result) return result.result;
};

/**
 * Retrieves the current value of some variable
 * @param variable - The variable name
 * @returns {Number}
 */
MathScript.prototype.getVariable = function getVariable(variable) {
    return this.context.getValue(variable);
};

/**
 * Sets the value of a variable
 * @param variable - The variable name
 * @param value - The variable new value
 */
MathScript.prototype.setVariable = function setVariable(variable, value) {
    this.context.setValue(variable, value);
};

module.exports = MathScript;