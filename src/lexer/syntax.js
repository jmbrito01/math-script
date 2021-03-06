module.exports = {
    divider: '=',
    variable: '$',
    separators: [
        {
            symbols: ['{', '}'],
            priority: 4
        },
        {
            symbols: ['[', ']'],
            priority: 5
        },
        {
            symbols: ['(', ')'],
            priority: 6
        }
    ],
    operations: [
        //Add
        {
            operator: '+',
            priority: 1,
            exec: (args) => { return args[0] + args[1]; }
        },
        //Sub
        {
            operator: '-',
            priority: 1,
            exec: (args) => { return args[0] - args[1]; }
        },
        //Multiply
        {
            operator: '*',
            priority: 2,
            exec: (args) => { return args[0] * args[1]; }
        },
        //Divide
        {
            operator: '/',
            priority: 2,
            exec: (args) => { return args[0] / args[1]; }
        },
        //Power
        {
            operator: '^',
            priority: 3,
            exec: (args) => { return Math.pow(args[0], args[1]); }
        },
        //Binary AND
        {
            operator: '&',
            priority: 1,
            exec: (args) => { return args[0] & args[1]; }
        },
        //Binary OR
        {
            operator: '|',
            priority: 1,
            exec: (args) => { return args[0] | args[1]; }
        },
        //Binary Left Shift
        {
            operator_sequence: ['<', '<'],
            priority: 1,
            exec: (args) => { return args[0] << args[1]; }
        },
        //Binary Right Shift
        {
            operator_sequence: ['>', '>'],
            priority: 1,
            exec: (args) => { return args[0] >> args[1]; }
        }
    ]
};