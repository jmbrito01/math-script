var fs = require('fs');

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

/**
 * Stores the context in a file to be loaded later.
 * @param file - The filename of the save to be saved the context
 * @returns {Promise}
 */
Context.prototype.saveToFile = function saveToFile(file) {
    return new Promise(function(resolve, reject) {
        var buffer = new Buffer(JSON.stringify(this.variables));
        fs.writeFile(file, buffer.toString('base64'), (err) => {
            if (err) reject(err);
            else resolve(null);
        })
    });
};

/**
 * Same as saveToFile but sync.
 * @param fil e- The filename of the save to be saved the context
 */
Context.prototype.saveToFileSync = function saveToFileSync(file) {
    var buffer = new Buffer(JSON.stringify(this.variables));
    fs.writeFileSync(file, buffer.toString('base64'));
};

module.exports = Context;