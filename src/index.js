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

/**
 * Saves the current state of the context in a file
 * @param file - The filename of the file
 * @returns {Promise}
 */
MathScript.prototype.saveContext = function(file) {
    return new Promise(function(resolve, reject) {
        this.context.saveToFile(file).then(resolve, reject);
    });
};

/**
 * Does the same as saveContext but all sync.
 * @param file - The filename of the file
 */
MathScript.prototype.saveContextSync = function(file) {
    return this.context.saveToFileSync(file);
};

module.exports = MathScript;