const pup = require('puppeteer');
const fs = require('fs');

let finalArr = [];

let info = ["Price", "market cap", "24h volume"];

let browserPromise = pup.launch({
	headless: false,
	defaultViewport: false,
	args: ["--start-maximized"],
	slowMo: 250
});

let tab;

browserPromise.then(browser => {
	let pagesPromise = browser.pages();   //array of tabs
	return pagesPromise;
})
	.then(function (pages) {
		tab = pages[0];     //first tab
		let pageOpenPromie = tab.goto('https://www.cointracker.io/price');
		return pageOpenPromie;
	})
	.then(function () {
		let aTagPromise = tab.$$(".list-group-item.flex-column.align-items-start a");
		return aTagPromise;
	})
	.then(function (arrayOfAtagsPromise) {
		let arrayOfHrefs = [];

		for (let i = 0; i < arrayOfAtagsPromise.length; i++) {
			let singleHref = tab.evaluate(function (ele) {
				return ele.getAttribute("href");
			}, arrayOfAtagsPromise[i]);
			arrayOfHrefs.push(singleHref);
		}
		return Promise.all(arrayOfHrefs);
	})
	.then(function (arrayOfHrefsPromise) {
		// console.log(arrayOfHrefsPromise);
		let solveSinglePromise = solve("https://www.cointracker.io" + arrayOfHrefsPromise[0]);
		for (let i = 1; i < 7; i++) {
			let somePro = solveSinglePromise.then(function () {
				let newPromise = solve("https://www.cointracker.io" + arrayOfHrefsPromise[i]);
				return newPromise;
			})
			solveSinglePromise = somePro;
		}
		return solveSinglePromise;
	})
	.then(function () {
		console.log(finalArr);
		fs.writeFileSync("data.json", JSON.stringify(finalArr));
	})


async function solve(link) {
	await tab.goto(link);
	let headingPromise = await tab.$(".mb-0.mr-3");
	let heading = await tab.evaluate(function (ele) {
		return ele.textContent;
	}, headingPromise);

	let info = await tab.$$(".my-auto.h4");
	let aForGithub = await tab.$$(".my-5 .btn.btn-outline-dark.my-2.mx-1");

	let linkForGithub;

	for (let i = 0; i < aForGithub.length; i++) {
		if (i == aForGithub.length - 1) {
			let singleLink = await tab.evaluate(function (ele) {
				return ele.getAttribute("href");
			}, aForGithub[i]);
			linkForGithub = singleLink;
		}
	}

	let infoArr = [];

	for (let i = 0; i < info.length; i++) {
		if (i == 0) {
			let singPro = await tab.evaluate(function (ele) {
				return ele.textContent;
			}, info[i]);
			infoArr.push(singPro);
		}
		else if (i == 4) {

			let singPro = await tab.evaluate(function (ele) {
				return ele.textContent;
			}, info[i]);
			infoArr.push(singPro);
		}
		else if (i == 5) {

			let singPro = await tab.evaluate(function (ele) {
				return ele.textContent;
			}, info[i]);
			infoArr.push(singPro);
		}
	}
	let finalInfoArr = [];

	for (let i = 0; i < infoArr.length; i++) {
		let infoPresent = infoArr[i];
		infoPresent = infoPresent.split("\n");
		for (let j = 0; j < infoPresent.length; j++) {
			if (infoPresent[j] != '') {
				finalInfoArr.push(infoPresent[j]);
			}
		}
	}
	heading = heading.split(" ");

	finalArr.push({
		"Name": heading[0],
		"Price": finalInfoArr[0],
		"MarketCap": finalInfoArr[1],
		"Volume24h": finalInfoArr[2],
		"Code": linkForGithub,
	})
}