/*
	=== Calculations for flyers ===
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

function getFlyerArtworkStatus(){
	var result = $("#flyer-paper-artwork").is(':checked');
	//console.log("Folded: " + result);

	return result;
}

function getFlyerMaterialsCost(){
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
	//return final materials cost rounded off to 2 decimal places
	return (priceWithoutWastage + wastage).toFixed(2);
}

function getFlyerPrePressCharges(){
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
	//return final prepress charges rounded off to 2 decimal places
	return (plateQty * platePrice).toFixed(2);
}

function getFlyerFinishingCharges(){
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
	//return final finishing charges rounded off to 2 decimal places

	if( getFlyerFoldStatus() ){
		return (cuttingCharges + foldingCharges).toFixed(2);
	}else{
		return (cuttingCharges).toFixed(2);
	}
}

function getFlyerPrintingCharges(){
	//get qty
	var paperQty = getFlyerQuantity();
	//console.log("Paper Qty: " + paperQty);

	//get initial printing charges
	//initial printing charges = paperQty / 2000
	var initPrintCharges = paperQty / 2000;
	//console.log("Initial Printing Charges: " + initPrintCharges);

	//get printing charges per hour
	var printChargesPerHour = 35;
	if ( paperQty > 10000 ) {
		printChargesPerHour = 40;
	}
	//console.log("Print Charges Per Hour: " + printChargesPerHour);

	//get final printing charges
	//final printing charges = initPrintCharges x printChargesPerHour
	//return final printing charges rounded off to 2 decimal places
	//console.log("Final Printing Charges: " + initPrintCharges * printChargesPerHour);
	return (initPrintCharges * printChargesPerHour).toFixed(2);
}

function getFlyerLabourCharges(){ return 20; }

function getFlyerDesignCharges(){
	//get qty
	var paperQty = getFlyerQuantity();

	//get initial design charges
	//initial design charges = paperQty/1000
	var initDesignCharges  = paperQty / 1000;

	//get design per hour charges
	var designPerHourCharges = 30;
	if ( getFlyerArtworkStatus() ) {
		designPerHourCharges = 10;
	}

	//get final design charges
	//final design charges = initDesignCharges x designPerHourCharges
	//return final design charges rounded off to 2 decimal places
	return (initDesignCharges * designPerHourCharges).toFixed(2);
}

function getFlyerGrandTotal(){
	//return grand total rounded off to 2 decimal places
	var grandTotal = 0;
	grandTotal = ( getFlyerMaterialsCost() * 1 ) + ( getFlyerPrePressCharges() * 1 ) + ( getFlyerFinishingCharges() * 1 ) +
	( getFlyerPrintingCharges() * 1 ) + ( getFlyerLabourCharges() * 1 ) + ( getFlyerDesignCharges() * 1 );
	return grandTotal.toFixed(2);
}

function getFlyerUnitPrice(){
	//return unit price rounded off to 2 decimal places
	//unit price = grand total / flyer qty
	return ( ( getFlyerGrandTotal() * 1 ) / ( getFlyerQuantity() * 1 ) ).toFixed(2);
}

function getFlyerTotalPrice(){
	//get initial price
	var initialPrice = ( getFlyerUnitPrice() * 1 ) * 1.4;

	//get final price
	//final price = initial price * flyer qty
	//return final price rounded off to 2 decimal places
	return ( initialPrice * ( getFlyerQuantity() * 1 ) ).toFixed(2);
}

function displayFlyerCalculations(){

	//clear existing html
	$('#flyer-total-price').html('');

	//check if all fields entered
	if( ( getFlyerPaperSize() != "" ) && ( getFlyerPaperType() != "" ) && 
		( getFlyerPaperColor() != "" ) && ( getFlyerQuantity() != "" )  ){
		//check qty
		var qty = getFlyerQuantity();
		if( qty >= 1 && qty <= 50000 ){
			//if qty within range

			//append new html
			$('#flyer-total-price').append(
				"<h3> Materials: $" + getFlyerMaterialsCost() + "</h3>" +
				"<h3> PrePress Charges: $" + getFlyerPrePressCharges() + "</h3>" +
				"<h3> Finishing Charges: $" + getFlyerFinishingCharges() + "</h3>" +
				"<h3> Printing Charges: $" + getFlyerPrintingCharges() + "</h3>" +
				"<h3> Labour Charges: $" + getFlyerLabourCharges() + "</h3>" +
				"<h3> Design Charges: $" + getFlyerDesignCharges() + "</h3>" +
				"<h3> Grand Total: $" + getFlyerGrandTotal() + "</h3>" +
				"<h3> Unit Price: $" + getFlyerUnitPrice() + "</h3>" +
				"<h3> Total Price Plus Profit Margin: $" + getFlyerTotalPrice() + "</h3>"
			);
		}else{
			//append new html
			$('#flyer-total-price').append(
				"<h3>Quantity can only be from 1 to 50000.</h3>"
			);
		}
	}else{
		//append new html
		$('#flyer-total-price').append(
			"<h3> Please enter paper size, paper type, paper color, and quantity. </h3>"
		);
	}
}

/*
	=== Calculations for brochures ===
*/

function getBrochurePaperSize(){
	var result = $('select[id=brochure-paper-size]').val();
	//console.log("Paper Size: " + result);

	return result;
}

function getBrochurePaperType(){
	var result = $('select[id=brochure-paper-type]').val();
	//console.log("Paper Type: " + result);

	return result;
}

function getBrochurePaperColor(){
	var result = $('select[id=brochure-paper-color]').val();
	//console.log("Paper Color: " + result);

	return result;
}

function getBrochureQuantity(){
	var result = $("#brochure-quantity").val();
	//console.log("Quantity: " + result);

	return result;
}

function getBrochureArtworkStatus(){
	var result = $("#brochure-paper-artwork").is(':checked');
	//console.log("Folded: " + result);

	return result;
}

function getBrochureMaterialsCost(){
	//get paper cuts from paper size
	var paperSize = getBrochurePaperSize();
	var paperCuts = 0;

	if ( paperSize == "a4" ) {
		paperCuts = 8;
	}else if( paperSize == "a5" ){
		paperCuts = 16;
	}

	//get qty
	var paperQty = getBrochureQuantity();

	//get paper pricing per ream from paper type
	var paperType = getBrochurePaperType();
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
	//return final materials cost rounded off to 2 decimal places
	return (priceWithoutWastage + wastage).toFixed(2);
}

function getBrochurePrePressCharges(){
	//get suitable plate type from quantity
	//0 -> DIGITAL -> less than 300
	//1 -> OFFSET -> more than 300
	var plateType = 0;

	if ( getBrochureQuantity() > 0 ) {

		if ( getBrochureQuantity() > 300 ) {
			plateType = 1;
		}

	}else{
		//insert codes for handling 0 qty
	}

	//get plate qty from paper color
	var plateQty = 0;

	if ( getBrochurePaperColor()  == "full-color" ) {
		plateQty = 4;
	}else if( getBrochurePaperColor()  == "black-white" ){
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
	//return final prepress charges rounded off to 2 decimal places
	return (plateQty * platePrice).toFixed(2);
}

function getBrochureFinishingCharges(){
	//get paper type
	var paperType = getBrochurePaperType();

	//get qty
	var paperQty = getBrochureQuantity();

	//get paper cuts from paper size
	var paperSize = getBrochurePaperSize();
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
	//return final finishing charges rounded off to 2 decimal places
	return (cuttingCharges + foldingCharges).toFixed(2);
}

function getBrochurePrintingCharges(){
	//get qty
	var paperQty = getBrochureQuantity();
	//console.log("Paper Qty: " + paperQty);

	//get initial printing charges
	//initial printing charges = paperQty / 2000
	var initPrintCharges = paperQty / 2000;
	//console.log("Initial Printing Charges: " + initPrintCharges);

	//get printing charges per hour
	var printChargesPerHour = 35;
	if ( paperQty > 10000 ) {
		printChargesPerHour = 40;
	}
	//console.log("Print Charges Per Hour: " + printChargesPerHour);

	//get final printing charges
	//final printing charges = initPrintCharges x printChargesPerHour
	//return final printing charges rounded off to 2 decimal places
	//console.log("Final Printing Charges: " + initPrintCharges * printChargesPerHour);
	return (initPrintCharges * printChargesPerHour).toFixed(2);
}

function getBrochureLabourCharges(){ return 20; }

function getBrochureDesignCharges(){
	//get qty
	var paperQty = getBrochureQuantity();

	//get initial design charges
	//initial design charges = paperQty/1000
	var initDesignCharges  = paperQty / 1000;

	//get design per hour charges
	var designPerHourCharges = 30;
	if ( getBrochureArtworkStatus() ) {
		designPerHourCharges = 10;
	}

	//get final design charges
	//final design charges = initDesignCharges x designPerHourCharges
	//return final design charges rounded off to 2 decimal places
	return (initDesignCharges * designPerHourCharges).toFixed(2);
}

function displayBrochureCalculations(){
	console.log("MaterialsCost: " + getBrochureMaterialsCost() );
	console.log("PrePress Charges: " + getBrochurePrePressCharges() );
	console.log("Finishing Charges: " + getBrochureFinishingCharges() );
	console.log("Printing Charges: " + getBrochurePrintingCharges() );
	console.log("Labour Charges: " + getBrochureLabourCharges() );
	console.log("Design Charges: " + getBrochureDesignCharges() );
}