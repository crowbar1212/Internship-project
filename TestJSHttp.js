

const open = require('open');
var express = require('express')
var app = express();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('10.10.4.80/index-test-sh.html').window.document;

const user = 'sharrison%40samaritanhealthcare.com'
const psswd = 'placeholder'

open('http://' + user + ':' + psswd + '@10.10.4.80/index-test-sh.html');

setTimeout(function(){
	var select = require('./TestJS2')
}, 9000);

document.addEventListener('DOMContentLoaded', (event) =>
{
if (event.target.readyState === "complete") {
var select = require('./TestJS2')
}
//console.log('this worked -http.js')
//document.getElementById('selDept').getElementsByTagName('option')[22].selected = 'selected' //getElementById('') selects what value to change, getElementsByTagName('')[] in () provide the tag name to look for and [] provides what value in that list to select
//document.getElementById('selDept').value=22
//global.document = new JSDOM().window.document
//document.getElementById('selDept').value=22
});
