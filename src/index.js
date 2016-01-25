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
MathScript.prototype.saveContext = function saveContext(file) {
    return new Promise((resolve, reject) => {
        this.context.saveToFile(file).then(resolve, reject);
    });
};

/**
 * Does the same as saveContext but all sync.
 * @param file - The filename of the file
 */
MathScript.prototype.saveContextSync = function saveContextSync(file) {
    return this.context.saveToFileSync(file);
};

/**
 * Loads the context from a file
 * @param file - the filename of the context
 * @returns {Promise}
 */
MathScript.prototype.loadContext = function loadContext(file) {
    return new Promise((resolve, reject) => {
        this.context.loadFromFile(file).then(resolve, reject);
    });
};

/**
 * Does the same as loadContext but sync
 * @param file - The filename of the file
 */
MathScript.prototype.loadContextSync = function loadContextSync(file) {
    this.context.loadFromFileSync(file);
};

module.exports = MathScript;