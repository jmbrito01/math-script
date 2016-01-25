var MathScript = require('../../src');

var script = new MathScript();

script.setVariable('$teste', 10);
script.execute('$result = $teste + 40');
console.log(script.getVariable('$result'));

//Important: Variables must always come with `$` before. It's a language pattern.