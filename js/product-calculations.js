/*
	Calculations for flyers
*/

//setup paper size prices
var flyer_paper_size_prices = new Array();
flyer_paper_size_prices["None"]=0;
flyer_paper_size_prices["A4"]=0.12;
flyer_paper_size_prices["A5"]=0.12;

//setup paper type prices
var flyer_paper_type_prices= new Array();
flyer_paper_type_prices["None"]=0;
flyer_paper_type_prices["Coated"]=5;
flyer_paper_type_prices["Uncoated"]=5;
flyer_paper_type_prices["Matte"]=7;
flyer_paper_type_prices["Glossy"]=8;

//setup color prices
var flyer_color_prices= new Array();
flyer_color_prices["None"]=0;
flyer_color_prices["oneside"]=5;
flyer_color_prices["twosides"]=15;

//setup quantity prices
var flyer_quantity_prices= new Array();
flyer_quantity_prices["None"]=0;
flyer_quantity_prices["100"]=5;
flyer_quantity_prices["500"]=15;

//get size price from user input
function getFlyerPaperSizePrice(){  

	var result=0;
	
	var theForm = document.forms["flyer-form"];
	
	var user_input = theForm.elements["flyer-paper-size"];

	result = flyer_paper_size_prices[user_input.value];

	//We return the result
	return result;
}

//get type price from user input
function getFlyerPaperTypePrice(){

	var result=0;
	
	var theForm = document.forms["flyer-form"];

	var user_input = theForm.elements["flyer-paper-type"];

	result = flyer_paper_type_prices[user_input.value];

	//finally we return result
	return result;
}

//get color price from user input
function getFlyerColorPrice(){

	var result=0;
	
	var theForm = document.forms["flyer-form"];

	var user_input = theForm.elements["flyer-paper-color"];

	console.log( "Color value: " + flyer_color_prices[user_input.value] );

	result = flyer_color_prices[user_input.value];

	console.log("Color: " + result);

	//finally we return result
	return result;
}

//get quantity price from user input
function getFlyerQuantityPrice(){

	var result=0;
	
	var theForm = document.forms["flyer-form"];

	var user_input = theForm.elements["flyer-quantity"];

	result = flyer_quantity_prices[user_input.value];

	console.log("Quantity: " + result);

	//finally we return result
	return result;
}

function calculateFlyerPrice(){
	var total = getFlyerPaperSizePrice() + getFlyerPaperTypePrice() + getFlyerColorPrice() + getFlyerQuantityPrice();
		
	//display the result
	var divobj = document.getElementById('flyer-total-price');
	divobj.style.display='block';
	divobj.innerHTML = "Total Price: $"+total.toFixed(2);
}

function hideFlyerTotalPrice(){

	var divobj = document.getElementById('flyer-total-price');
	divobj.style.display='none';
}