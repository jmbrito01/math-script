function Context() {
    this.variables = {};
}

/**
 * Sets a value to a variable inside this context
 * @param variable - The variable name
 * @param value - The new value to be set
 */
Context.prototype.setValue = function setValue(variable, value) {
    this.variables[variable] = value;
};

/**
 * Retrieves the value of a variable in the context
 * @param variable - The variable you want the value of
 * @returns {Number}
 */
Context.prototype.getValue = function getValue(variable) {
    return this.variables[variable];
};

module.exports = Context;