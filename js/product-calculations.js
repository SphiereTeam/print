/*
	Calculations for flyers
*/

function getFlyerPaperSize(){
	var result = $('select[id=flyer-paper-size]').val();
	//console.log("Paper Size: " + result);

	return result;
}

function getFlyerPaperType(){
	var result = $('select[id=flyer-paper-type]').val();
	//console.log("Paper Type: " + result);

	return result;
}

function getFlyerPaperColor(){
	var result = $('select[id=flyer-paper-color]').val();
	//console.log("Paper Color: " + result);

	return result;
}

function getFlyerQuantity(){
	var result = $("#flyer-quantity").val();
	//console.log("Quantity: " + result);

	return result;

}

function getFlyerFoldStatus(){
	var result = $("#flyer-paper-fold").is(':checked');
	//console.log("Folded: " + result);

	return result;

}

function getMaterialsCost(){

	//get paper cuts from paper size
	var paperSize = getFlyerPaperSize();
	var paperCuts = 0;

	if ( paperSize == "a4" ) {
		paperCuts = 8;
	}else if( paperSize == "a5" ){
		paperCuts = 16;
	}

	//get qty
	var paperQty = getFlyerQuantity();

	//get paper pricing per ream from paper type
	var paperType = getFlyerPaperType();
	var paperPricingPerReam = 0;

	if ( paperType == "mattart" ) {
		paperPricingPerReam = 68;
	}else if( paperType == "simili" ){
		paperPricingPerReam = 40;
	}

	//get qty sheets
	//qty sheets = qty/cuts
	var qtySheets = paperQty/paperCuts;

	//get qty reams per packets
	//qty reams per packets = qty sheets/500
	var qtyReamsPerPackets = qtySheets/500;

	//get price w/o wastage
	//price w/o wastage = qty reams per packets x pricing per ream
	var priceWithoutWastage = qtyReamsPerPackets * paperPricingPerReam;

	//get wastage
	//wastage = price w/o wastage x 0.2
	var wastage = priceWithoutWastage * 0.2;

	//get final materials cost
	//final materials cost = price w/o wastage + wastage
	return priceWithoutWastage + wastage;

}

function getPrePressCharges(){

	//get suitable plate type from quantity
	//0 -> DIGITAL -> less than 300
	//1 -> OFFSET -> more than 300
	var plateType = 0;

	if ( getFlyerQuantity() > 0 ) {

		if ( getFlyerQuantity() > 300 ) {
			plateType = 1;
		}

	}else{
		//insert codes for handling 0 qty
	}

	//get plate qty from paper color
	var plateQty = 0;

	if ( getFlyerPaperColor()  == "full-color" ) {
		plateQty = 4;
	}else if( getFlyerPaperColor()  == "black-white" ){
		plateQty = 1;
	}

	//get plate price from plate type
	var platePrice = 0;

	if ( plateType == 0 ) {
		platePrice = 0.26;
	}else if( plateType == 1 ){
		platePrice = 15;
	}

	//get final prepress charges
	//final prepress charges = plateQty x platePrice
	return plateQty * platePrice;

}

function getFinishingCharges(){

	//get paper type
	var paperType = getFlyerPaperType();

	//get qty
	var paperQty = getFlyerQuantity();

	//get paper cuts from paper size
	var paperSize = getFlyerPaperSize();
	var paperCuts = 0;

	if ( paperSize == "a4" ) {
		paperCuts = 8;
	}else if( paperSize == "a5" ){
		paperCuts = 16;
	}

	//get qty sheets
	//qty sheets = qty/cuts
	var qtySheets = paperQty/paperCuts;

	//get wastage qty sheets
	var wastageQtySheets = 0;

	if ( paperType == "mattart" ) {
		wastageQtySheets = qtySheets * 1.1;
	}else if( paperType == "simili" ){
		wastageQtySheets = qtySheets * 1.2;
	}

	//get cutting/trimming charges
	var cuttingCharges = 0;
	var cuttingPricePerUnit = 0.08;
	if ( paperQty > 1000 ) {
		cuttingPricePerUnit = 0.1;
	}
	cuttingCharges = wastageQtySheets *cuttingPricePerUnit;

	//get perforation/folding charges
	var foldingCharges = 0;
	var foldingPricePerUnit = 0.01;
	if ( paperQty > 2000 ) {
		foldingPricePerUnit = 0.008;
	}
	foldingCharges = paperQty * foldingPricePerUnit;

	//get final finishing charges
	//final finishing charges = cuttingCharges + foldingCharges

	if( getFlyerFoldStatus() ){
		return cuttingCharges + foldingCharges;
	}else{
		return cuttingCharges;
	}

}

function getPrintingCharges(){

	//get qty
	var paperQty = getFlyerQuantity();
	console.log("Paper Qty: " + paperQty);


	//get initial printing charges
	//initial printing charges = paperQty / 2000
	var initPrintCharges = paperQty / 2000;
	console.log("Initial Printing Charges: " + initPrintCharges);

	//get printing charges per hour
	var printChargesPerHour = 35;
	if ( paperQty > 10000 ) {
		printChargesPerHour = 40;
	}
	console.log("Print Charges Per Hour: " + printChargesPerHour);

	//get final printing charges
	//final printing charges = initPrintCharges x printChargesPerHour
	console.log("Final Printing Charges: " + initPrintCharges * printChargesPerHour);
	return initPrintCharges * printChargesPerHour;

}

function getLabourCharges(){

	return 20;

}

function calculateFlyerPrice(){

	//clear existing html
	$('#flyer-total-price').html('');

	//append new html
	$('#flyer-total-price').append(
		"<h3> Materials: $" + getMaterialsCost() + "</h3>" +
		"<h3> PrePress Charges: $" + getPrePressCharges() + "</h3>" +
		"<h3> Finishing Charges: $" + getFinishingCharges() + "</h3>" +
		"<h3> Printing Charges: $" + getPrintingCharges() + "</h3>" +
		"<h3> Labour Charges: $" + getLabourCharges() + "</h3>"
	);
}