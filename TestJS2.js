//export function hello() {
//console.log('Hello Samaritan Server, and Happy Thanksgiving!')
//}
/**
module.exports = {
	hello: function () {
		console.log('Hello Samaritan Server, and Happy Thanksgiving!')
	}
};
**/

/**
module.exports = {
	hello: console.log('Hello Samaritan Server, and Happy Thanksgiving!   -- From TestJS1.js')
};
**/
//console.log('does math line bring this')


//open('http://' + user + ':' + psswd + '@10.10.4.80/index-test-sh.html');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('10.10.4.80/index-test-sh.html').window.document;



var selection = document.getElementById('selDept');
var inputVal = '';
//console.log('this worked -JS2.js before if')
//console.log(selection)
selection.getElementsByTagName('option')[22].selected = 'selected'
if (selection) {
//console.log('this worked')
selection.getElementsByTagName('option')[22].selected = 'selected' //possible issue: this may be running before DOM is ready
}

if (selection == null){
	console.log('selection is null')
}