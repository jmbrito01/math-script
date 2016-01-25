# math-script

math-script is a very simplistic scriipting language to
interpret common mathematical expressions.

## How to Use
    var MathScript = require('math-script');

    var script = new MathScript();
    console.log(`The result of 2+2 = ${script.execute('2 + 2')}`);
    //The result of 2+2 = 4

## Changelog:

**Version 1.0.0**
* Simple math operations (add, sub, mult, div, pow)
* Support for parenthesis, brackets and braces

**Version 1.1.0**
* Added support for multi-character symbols(symbols
that are more than one character long)
* Simple binary operations (and, or, left and right shift)

## License
The MIT License (MIT)
Copyright (c) 2016 João Marcelo Brito<joaomarcelobrito01@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


