var syntax = require('./syntax');
var Error = require('../error').LexicalError;

function Lexer(expression) {
    //Lets erase the spaces to become less complicated to parse later
    this.expression = expression.replace(/ /g, "");
}


/**
 * Retrieves the left side of the expression
 */
Lexer.prototype.getLeftSide = function getLeftSide() {
    return this.expression.substr(0, this.getDividerIndex());
};

/**
 * Retrieves the right side of the expression
 */
Lexer.prototype.getRightSide = function getRightSide() {
    return this.expression.substr(this.getDividerIndex()+1);
};

/**
 * Checks if the expression is a single-sided expression
 * @returns {boolean}
 */
Lexer.prototype.isSingleSided = function isSingleSided() {
    return this.expression.indexOf(syntax['divider']) === -1;
};

/**
 * Retrieves the index of the 'equal sign' that separates the expression
 */
Lexer.prototype.getDividerIndex = function getDeviderIndex() {
    return this.expression.lastIndexOf(syntax['divider']) || -1; //Return -1 if it's a one side only expression
};

/**
 * Checks if the number is really a well-formed number
 * @param {Number} [number] If not specified, the functions uses the whole expression
 * @returns {boolean} True if it's a number, false otherwise.
 */
Lexer.prototype.isNumber = function isNumber(number) {
    if (!number) this.number = this.expression;
    return !isNaN(parseFloat(number)) && isFinite(number);
};

/**
 * Checks if a certain character is a well-formed and known symbol from the syntax
 * @param symbol
 * @returns {boolean} True if it's a symbol, false otherwise
 */
Lexer.prototype.isSymbol = function isSymbol(symbol) {
    if (symbol == syntax['divider']) return true;
    else {
        for (var i in syntax.operations) {
            if (syntax.operations[i].operator == symbol) return true;
        }
    }
    return false;
};

/**
 * Retrieves a symbol from the syntax file
 * @param operator - The operator you want to search
 * @returns {Operator} the operator from syntax.js you searched or null if not found
 */
Lexer.prototype.getSymbol = function getSymbol(operator) {
    for (var i in syntax.operations) {
        if (syntax.operations[i].operator === operator) return syntax.operations[i];
    }
    return null;
};

/**
 * Checks if a expression character is variable. It actually just check if the character is a letter
 * @param variable - The variable to be checked
 * @returns {boolean} true is its a variable, false otherwise.
 */
Lexer.prototype.isVariable = function isVariable(variable) {
    return variable.match(/[a-zA-Z]/) !== null;
};

/**
 * Checks if a expression character is a separator
 * @param separator - The character to be checked.
 * @returns {boolean}
 */
Lexer.prototype.isSeparator = function isSeparator(separator) {
    for (var i in syntax.separators) {
        var each = syntax.separators[i];
        if (each.symbols.indexOf(separator) != -1) return true;
    }
    return false;
};

/**
 * Retrieves a separator information
 * @param separator
 * @returns {Separator}
 */
Lexer.prototype.getSeparator = function getSeparator(separator) {
    for (var i in syntax.separators) {
        var each = syntax.separators[i];
        if (each.symbols.indexOf(separator) != -1) {
            return each;
        }
    }
    return null;
};

/**
 * Analysis for organizing all available informations on the expression
 */
Lexer.prototype.analyse = function analyse() {
    var result = [];
    //TODO: Check for parenthesis operations
    //TODO: Check for functions (sen(), cos(), tan())
    //Loop through all characters of the expression
    for (var i = 0;i < this.expression.length;i++) {
        //Check if this char is a number
        if (this.isNumber(this.expression[i])) {
            //Get the complete number(this one is just a character long)
            var length = 1;
            while (i+length < this.expression.length && this.isNumber(this.expression[i+length])) {
                length++;
            }
            result.push({
                type: 'number',
                value: parseFloat(this.expression.substr(i, length))
            });
            i += length-1;
        }
        //Check if it's a symbol
        else if (this.isSymbol(this.expression[i])) {
            result.push({
                type: this.expression[i] === syntax['divider'] ? 'divider':'symbol',
                value: this.expression[i],
                operation: this.getSymbol(this.expression[i])
            });
        }
        //Check if it's a variable
        else if (this.isVariable(this.expression[i])) {
            result.push({
                type: 'variable',
                value: this.expression[i]
            });
        }
        //Check if it's a separator
        else if (this.isSeparator(this.expression[i])) {
            var separator = this.getSeparator(this.expression[i]);
            //Check if the operator is not closing something that is not opened.
            if (this.expression[i] == separator.symbols[1]) {
                var error = new Error(`Unexpected separator: ${this.expression[i]}`, `Ident ${i}`);
                error.throw();
            } else {
                //Get the end of the separation
                //Check if theres another separator between you and the end of the separation
                var next_open = this.expression.indexOf(separator.symbols[0], parseInt(i)+1);
                var last_close = this.expression.lastIndexOf(separator.symbols[1]);
                if (last_close === -1) {
                    //No closing symbol
                    var error = new Error(`Closing separator not found('${separator.symbols[1]}')`, `Ident ${i}`);
                    error.throw();
                }
                else if (next_open === -1) {
                    //The next separator is not inside this separator
                    result.push({
                        type: 'separator',
                        separator,
                        value: this.expression.substr(parseInt(i)+1, (last_close-i)-1)
                    });
                    i += last_close-i;
                } else {
                    //Nested separators
                    var count = 1;
                    for (var j = next_open;j < this.expression.length;j++) {
                        if (this.expression[j] === separator.symbols[0]) count++; //Opening separator
                        if (this.expression[j] === separator.symbols[1]) count--; //Closing seperator
                        if (!count) break;
                    }
                    if (count) {
                        //No closing symbol
                        var error = new Error(`Closing separator not found('${separator.symbols[1]}')`, `Ident ${i}`);
                        error.throw();
                    } else {
                        result.push({
                            type: 'separator',
                            separator,
                            value: this.expression.substr(parseInt(i)+1, (j-i)-1)
                        });
                        i += (j-i);
                    }
                }
            }
        }
        else {
            var error = new Error(`Unexpected statement: ${this.expression[i]}`, `Ident ${i}`);
            error.throw();
        }
    }
    return result;
};


module.exports = Lexer;