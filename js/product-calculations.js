/*
	Calculations for flyers
*/

function getFlyerPaperSize(){
	var result = $('select[id=flyer-paper-size]').val();
	console.log("Paper Size: " + result);

	return result;
}

function getFlyerPaperType(){
	var result = $('select[id=flyer-paper-type]').val();
	console.log("Paper Type: " + result);

	return result;
}

function getFlyerPaperSide(){
	var result = $('select[id=flyer-paper-side]').val();
	console.log("Paper Side: " + result);

	return result;
}

function getFlyerQuantity(){
	var result = $("#flyer-quantity").val();
	console.log("Quantity: " + result);

	return result;

}

function calculateFlyerPrice(){

	//clear existing html
	$('#flyer-total-price').html('');

	//get paper cuts from paper size
	var paperCuts = 0;
	if( getFlyerPaperSize() == "A4" ){
		paperCuts = 8;
	}else if( getFlyerPaperSize() == "A5" ){
		paperCuts = 16;
	}

	//insert codes for paper type here

	//get paper side cost
	var paperSideCost = 0;
	if( getFlyerPaperSide() == "oneside" ){
		paperSideCost = 0.5;
	}else if( getFlyerPaperSide()  == "twosides" ){
		paperSideCost = 0.7;
	}

	//get printer from quantity
	// 0 -> Digital
	// 1 -> Not Digital
	var printer = 0;
	if ( getFlyerQuantity() > 0 ) {

		if ( getFlyerQuantity() > 300 ) {
			//if qty is more than 300
			printer = 1;
		}

	}else{
		//insert codes handling 0 qty here
	}

	//calculate price
	var totalPrice = 0;
	if ( printer == 0 ) {
		//if printer is digital
		totalPrice = paperSideCost * getFlyerQuantity();

	}else if( printer == 1 ){
		//if printer is not digital

	}else{
		//insert codes handling other values of printer here
	}

	//append new html
	$('#flyer-total-price').append(
		"<h3> Paper Size: " + getFlyerPaperSize() + "</h3>" +
		"<h3> Paper Type: " + getFlyerPaperType() + "</h3>" +
		"<h3> Paper Side: " + getFlyerPaperSide() + "</h3>" +
		"<h3> Quantity: " + getFlyerQuantity() + "</h3>" +
		"<h3> Total Price: $" + totalPrice + "</h3>"
	);
}