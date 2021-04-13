const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

async function createPDF(data){

	//var templateHtml = fs.readFileSync(path.join(process.cwd(), 'template.html'), 'utf8');
	var templateHtml = fs.readFileSync(path.join(process.cwd(), 'f119.html'), 'utf8');
	var template = handlebars.compile(templateHtml);
	//var html = template(data);
	var html = template({});

	var milis = new Date();
	milis = milis.getTime();

	var pdfPath = path.join('pdf', `${data.name}-${milis}.pdf`);

	var options = {
		// width: '297mm',
		// height: '210mm',
		headerTemplate: "<p></p>",
		footerTemplate: "<p></p>",
		displayHeaderFooter: false,
		margin: {
			top: "0px",
			bottom: "0px"
		},
		printBackground: true,
		path: pdfPath,
		format: 'A4',
		landscape: true
	}

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true
	});

	var page = await browser.newPage();
	
	await page.goto(`data:text/html;charset=UTF-8,${html}`, {
		waitUntil: 'networkidle0'
	});

	await page.pdf(options);
	await browser.close();
}

const data = {
	title: "A new Brazilian School",
	date: "05/12/2018",
	name: "Rodolfo Luis Marcos",
	age: 28,
	birthdate: "12/07/1990",
	course: "Computer Science",
	obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce."
}

createPDF(data);