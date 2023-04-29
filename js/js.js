/* here are the arrays used for project 1 
data.js*/

var filenames = ["106020.jpg", "116010.jpg", "120010.jpg"];
var titles = ["Girl with a Pearl Earring", "Artist Holding a Thistle", "Portrait of Eleanor of Toledo"];
var quantities = [3, 1, 2];
var prices = [80, 125, 75];

/* 
   NOTE: parallel arrays are not an ideal way to represent this data.
         We have done this to simplify this exercise.
         
         A better approach would be to turn these parallel arrays
         into an array of cart item objects. Objects are used in
         projects 2 and 3.
*/         


/* add loop and other code here ... 
chapter08-project01.js
*/
var subTotal = 0;
var tax = 0;
var shipping = 0;
var grandTotal = 0;

var file = "";
var title = "";
var quantity = 0;
var price = 0;
var total = 0;

for(var i = 0; i < filenames.length; i++) {
	file = filenames[i];
	title = titles[i];
	quantity = quantities[i];
	price = prices[i];
	total = calculateTotal(quantity, price);
	subTotal += total;
	outputCartRow(file, title, quantity, price, total);
}

//tax
tax = subTotal * 0.10;

//shipping
if(subTotal > 1000) 
	shipping = 0;
else
	shipping = 40;

//grand total
grandTotal = subTotal + tax + shipping;

//print totals
document.write("<tr class='totals'>");
document.write("<td colspan='4'>Subtotal</td>");
document.write("<td>$" + subTotal.toFixed(2) + "</td>");
document.write("</tr>");

document.write("<tr class='totals'>");
document.write("<td colspan='4'>Tax</td>");
document.write("<td>$" + tax.toFixed(2) + "</td>");
document.write("</tr>");


document.write("<tr class='totals'>");
document.write("<td colspan='4'>Shipping</td>");
document.write("<td>$" + shipping.toFixed(2) + "</td>");
document.write("</tr>");

document.write("<tr class='totals focus'>");
document.write("<td colspan='4'>Grand Total</td>");
document.write("<td>$" + grandTotal.toFixed(2) + "</td>");
document.write("</tr>");





/* define functions here 
function.js */
function calculateTotal(quantity, price) {
	return quantity * price;
}

function outputCartRow(file, title, quantity, price, total) {
	document.write("<tr>");
	document.write("<td> <img src='images/" + file + "'></td>");
	document.write("<td>"+ title + "</td>");
	document.write("<td>"+ quantity + "</td>");
	document.write("<td>$"+ price.toFixed(2) + "</td>");
	document.write("<td>" + calculateTotal(quantity, price).toFixed(2) + "</td>");
	document.write("</tr>");
}