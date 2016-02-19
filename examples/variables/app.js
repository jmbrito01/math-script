var MathScript = require('../../src');

var script = new MathScript();

script.setVariable('$teste', 10);
script.execute('$result = $teste + 40');
console.log(script.getVariable('$result'));
//50

//Import / Export contexts
script.saveContext('context.cx').then(() => {
    var otherScript = new MathScript();
    otherScript.loadContext('context.cx').then(() => {
        console.log(otherScript.getVariable('$result'));
    }, (err) => {
        throw err;
    });
}, (err) => {
    throw err;
});

//Important: Variables must always come with `$` before. It's a language pattern.