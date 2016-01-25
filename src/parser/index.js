var Lexer = require('../lexer');
var Error = require('../error');

function Parser(expression, context) {
    this.lexer = new Lexer(expression);
    this.analysis = this.lexer.analyse();
    this.context = context;
}

/**
 * Execute the expression in order to extract it's result.
 * @returns {Object}
 */
Parser.prototype.execute = function execute() {
    if (this.lexer.isSingleSided()) {
        //One side expression
        return this.parse(this.analysis);
    } else {
        //Separate left and right side
        var sides = this.splitSides(this.analysis);
        var analysisSides = {
            right: this.parse(sides.right),
            left: this.parse(sides.left)
        };
        //Lets handle the results of the two sides
        switch (analysisSides.left.type) {
            case 'variable':
                switch (analysisSides.right.type) {
                    case 'number': //variable = number
                        this.context.setValue(analysisSides.left.result, analysisSides.right.result);
                        return analysisSides.right;
                    case 'variable': //variable = variable
                        this.context.setValue(analysisSides.left.result, this.context.getValue(analysisSides.right.result));
                        return analysisSides.right.result;
                }
                break;
        }

    }
};

/**
 * Parses the mathematical expression
 * @param analysis
 * @returns {Object}
 */
Parser.prototype.parse = function parse(analysis) {
    var result = {analysis};
    var biggest = this.getBiggestPriority(analysis);
    for (var i = biggest;i > 0;i--) {
        result.analysis = this.simplify(result.analysis, i);
    }
    if (result.analysis.length === 1) {
        //Single result
        switch (result.analysis[0].type) {
            case 'number':
                result.result = result.analysis[0].value;
                result.type = 'number';
                break;
            case 'variable':
                result.result = result.analysis[0].value;
                result.type = 'variable';
                break;
        }
    }
    return result;
};

/**
 * Split the left and right side from the analysis
 * @param analysis
 * @returns {Array}
 */
Parser.prototype.splitSides = function splitSides(analysis) {
    var result = {
        left: [],
        right: []
    };
    for (var i in analysis) if (analysis[i].type === 'divider') break;

    result.left = analysis.slice(0, i);
    result.right = analysis.slice(parseInt(i)+1);
    return result;
};

/**
 * Gets the most important operation level in the expression
 * @param analysis
 * @returns {number}
 */
Parser.prototype.getBiggestPriority = function getBiggestPriority(analysis) {
    var biggest = 0;
    for (var i in analysis) {
        var each = analysis[i];
        switch (each.type) {
            case 'symbol': if (each.operation.priority > biggest) biggest = each.operation.priority;
                break;
            case 'separator': if (each.separator.priority > biggest) biggest = each.separator.priority;
                break;
        }
    }
    return biggest;
};

/**
 * Checks if an analysis object is a valid argument object.
 * @param arg - The analysis object you want to check
 * @returns {boolean}
 */
Parser.prototype.isValidArgument = function isValidArgument(arg) {
    return typeof arg === 'object' && (arg.type === 'number' || arg.type === 'variable');
};

/**
 * Retrieves the value of an analysis object
 * @param arg - The analysis object you want the value of
 * @returns {Number}
 */
Parser.prototype.getValue = function getValue(arg) {
    switch (arg.type) {
        case 'number':
            return arg.value;
        case 'variable':
            return this.context.getValue(arg.value);
        default:
            return null;
    }
};

/**
 * Simplifies the operations in a analysis
 * @param analysis
 * @param priority - The priority you want to simplify from the expression
 * @returns {Array} The simplified version of the analysis
 */
Parser.prototype.simplify = function(analysis, priority) {
    var result = [];
    for (var i = 0;i < analysis.length;i++) {
        var each = analysis[i];
        switch (each.type) {
            case 'symbol':
                if (each.operation.priority === priority) {
                    //Thats the type of symbol we need to simplify
                    var before = analysis[i - 1];
                    var after = analysis[parseInt(i) + 1]; //Javascript somehow understands the i in there as a string
                    if (this.isValidArgument(before) && this.isValidArgument(after)) {
                        //There are all the arguments we need
                        result.pop(); //Erases 'before' from the results as it'll be simplified
                        result.push({
                            type: 'number',
                            value: parseFloat(each.operation.exec([this.getValue(before), this.getValue(after)]))
                        });
                        i++; //Skip the 'after' number because it's already handled.
                    }
                } else result.push(each);
                break;
            case 'separator':
                //Expression analysis
                if (each.separator.priority === priority) {
                    var lexer = new Lexer(each.value);
                    var sepAnalysis = this.parse(lexer.analyse());
                    if (sepAnalysis.analysis) {
                        result.push(sepAnalysis.analysis[0]);
                    }
                } else result.push(each);
                break;
            default: result.push(each);
                break;
        }
    }
    return result;
};

/**
 * Maps all the variables to change their values later.
 * @param analysis
 */
Parser.prototype.mapVariables = function mapVariables(analysis) {
    var variables = {};
    for (var i in analysis) {
        var each = analysis[i];
        if (each.type === 'variable') variables[each.value] = 0;
    }
};

module.exports = Parser;