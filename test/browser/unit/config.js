// You can do this in the grunt config for each mocha task, see the `options` config
 
// Protect from barfs
console = window.console || function() {};
 
// Don't track
window.notrack = true;

mocha.setup('bdd');
mocha.reporter('html');