const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

async function createPDF(data){

	//var templateHtml = fs.readFileSync(path.join(process.cwd(), 'template.html'), 'utf8');
	var templateHtml = fs.readFileSync(path.join(process.cwd(), 'f119.html'), 'utf8');
	// handlebars.registerHelper("if", function(conditional, options) {
	// 	if (conditional) {
	// 	  return options.fn(this);
	// 	}
	//   });
	var template = handlebars.compile(templateHtml);
	var html = template(data);
	//var html = template({});

	var milis = new Date();handlebars
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

// const data = {
// 	title: "A new Brazilian School",
// 	date: "05/12/2018",
// 	name: "Rodolfo Luis Marcos",
// 	age: 28,
// 	birthdate: "12/07/1990",
// 	course: "Computer Science",
// 	obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce."
// }

const data = {
	barcode: '14089207000016',
	sender_name: 'Иванов Иван Иванович',
	sender_index: '115516',
	sender_address: '350010, Краснодарский край, г Краснодар, ул Длинная (Садовое товарищество Любитель), д 32',
	sender_note: 'Вариант № 2 (99х144  - отступ сверху 1мм)',
	simple_notice: true,
	registered_notice: true,
	letter: true,
	wrapper: true,
	parcel: true,
	first_class_departure: true,
	registered: true,
	declared_value: true,
	ordinary: true,
	recipient_name: 'Мищенко Василий Иванович',
	recipient_index: '423570',
	recipient_address: 'НИЖНЕКАМСК ТАТАРСТАН РЕСПУБЛИКА 423570',
};

createPDF(data);