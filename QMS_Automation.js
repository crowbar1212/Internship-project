const puppeteer = require('puppeteer');
var username = 'sharrison@samaritanhealthcare.com';
var password = 'Hbhs2012';
const arguments = process.argv
var deptName = arguments[2]; 	//vars declared here have their values passed in from the batch file 
var reportId = arguments[3];	//the first 2 spots of the arguments array are used by the filename and location
var numerator = arguments[4];
var denominator = arguments[5];
var mth = arguments[6];
var yr = arguments[7];

let prs = /__/gi;
deptName = deptName.replace(prs, ' ');

//var deptName = 'Quality'; //pass in these values from batch file/SQL. Values shown here as numbers can be passed in as either numbers or strings, numerator and denominator can also be decimal values
//var reportId = 1640;
//var numerator = 4242.44;
//var denominator = 18888.66;
//var mth = 12;
//var yr = 2021;

var numSelect = '#num' + mth; //combine with month to get proper numerator selector
var denomSelect = '#denom' + mth; //combine with month to get proper denominator selector
var reportIdSelect = '#m' + reportId;

(async () => {
	const browser = await puppeteer.launch({headless: false, defaultViewport: null}); //set headless to true to disable showing the browser
	const page = await browser.newPage();
	await page.authenticate({'username': username, 'password': password}); //pass in credentials
	await page.goto('http://10.10.4.64/index-test-sh.html') //go to QMS url, updated from 10.10.4.80 to 10.10.4.64 which points to gt02
 
	await page.waitForSelector('#selDept');
	let optionValue = await page.$$eval('option', (options, deptName) => options.find(o => o.innerText === deptName)?.value, deptName); //'option' tells it to look at all option elements, o.innerText === "Quality" looks for the one that says quality, then ?.value returns the value attribute of that tag assuming the html provides a value
	await page.select('#selDept', optionValue);
	
	await page.waitForTimeout(3000); //provide some time for QMS to retrieve data, minimum value ~700
	
	await page.waitForSelector(reportIdSelect);
	await page.click(reportIdSelect)
	
	await page.click('div[title="f5"]');

	await page.$eval('#dataYear', (element, yr) => {
		element.value = yr;
	}, yr);

	await page.$eval(numSelect, (element, numerator) => {
		element.value = numerator;
		const event = new Event('change');
		element.dispatchEvent(event);
	}, numerator);

	await page.$eval(denomSelect, (element, denominator) => {
		element.value = denominator;
		const event = new Event('change');
		element.dispatchEvent(event);
	}, denominator);

	await page.evaluate(() => {
		savingData(); //saving data is a reference to the js_version=1.10.js file that the QMS html references.
	});

	await  page.waitForTimeout(3000);
	await browser.close();
	
})();