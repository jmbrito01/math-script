# math-script

math-script is a very simplistic scriipting language to
interpret common mathematical expressions.

## How to Use

    var MathScript = require('math-script');

    var script = new MathScript();
    console.log(`The result of 2+2 = ${script.execute('2 + 2')}`);
    script.execute('$x = (4 * 3) + 15');
    console.log(`$x equals to ${script.getVariable('$x')}`);
    //The result of 2+2 = 4
    //$x equals to 27

## MathScript References
### Operators
**operator_name (syntax)**
* Add(+)
* Subtract(-)
* Divide(/)
* Multiply (*)
* Power (^)
* Left Shift (<<)
* Right Shift (>>)
* Bitwise AND (&)
* Bitwise OR (|)

### Variables
Variables in MathScript are designed to be very simple, no
need for initialization(the first time you use it will
be mapped in the memory). To use them you only need one thing,
specify that it is a variable. To do that, use the symbol $
before the variable name. For example:

    $myvar = 15
    $otherVar = $myvar + 15

**REMEMBER: Variables are case-sensitive,
`$myvar` is not equal to `$MYVAR`**

### Library References

#### execute(expression)
Executes a MathScript code.

**Parameters:**
* expression: The math script expression you want to execute

**Result:** is the result of the expression

**Examples:** Check examples/simplest

#### getVariable(variable)
Retrieves a variable's value from the context

**Parameters:**
* variable: The name of the variable to be retrieved.

**Result:** is the value of the variable

**Examples:** Check examples/variables

#### setVariable(variable, value)
Sets a variable's value from the context

**Parameters:**
* variable: The name of the variable
* value: The new value to be set in the variable

**Result:** None

**Examples:** Check examples/variables

#### saveContext(file)
Exports the current context to a file

**Parameters:**
* file: The filename where the context will be saved

**Result:** A promise.

**Examples:** Not available yet.

#### saveContextSync(file)
The same as saveContext but sync.

**Parameters:**
* file: The filename where the context will be saved

**Result:** None.

**Examples:** Not available yet.

## Examples
This project is filled with examples, you can check them on
the source code in the examples directory.
* **simplest:** The hello world of the library, the simplest
code you can do using the math-script library


## Changelog:

**Version 1.0.0**
* Simple math operations (add, sub, mult, div, pow)
* Support for parenthesis, brackets and braces

**Version 1.1.0**
* Added support for multi-character symbols(symbols
that are more than one character long)
* Simple binary operations (and, or, left and right shift)

**Version 1.2.0**
* Added support for variables
* Added example examples/variables
* Export/Import the vm context

## License
The MIT License (MIT)
Copyright (c) 2016 João Marcelo Brito

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


