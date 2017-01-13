/*
    Calculations for business cards
*/

//setup size prices
var business_card_size_prices = new Array();
business_card_size_prices["None"]=0;
business_card_size_prices["Size 1"]=20;
business_card_size_prices["Size 2"]=25;
business_card_size_prices["Size 3"]=35;
business_card_size_prices["Size 4"]=75;
business_card_size_prices["Size 5"]=80;

//setup type prices
var business_card_type_prices= new Array();
business_card_type_prices["None"]=0;
business_card_type_prices["Type 1"]=5;
business_card_type_prices["Type 2"]=5;
business_card_type_prices["Type 3"]=7;
business_card_type_prices["Type 4"]=8;
business_card_type_prices["Type 5"]=10;

//setup ink type prices
var business_card_ink_type_prices= new Array();
business_card_ink_type_prices["None"]=0;
business_card_ink_type_prices["Ink 1"]=5;
business_card_ink_type_prices["Ink 2"]=5;
business_card_ink_type_prices["Ink 3"]=7;
business_card_ink_type_prices["Ink 4"]=8;
business_card_ink_type_prices["Ink 5"]=10;

//get size price from user input
function getBusinessCardSizePrice(){  

    var business_card_size_price=0;
    
    var theForm = document.forms["business-card-form"];
    
    var card_size = theForm.elements["business-card-size"];
    business_card_size_price = business_card_size_prices[card_size.value];

    //We return the business_card_size_price
    return business_card_size_price;
}

//get type price from user input
function getBusinessCardTypePrice(){

    var business_card_type_price=0;
    
    var theForm = document.forms["business-card-form"];
    var card_type = theForm.elements["business-card-type"];
    business_card_type_price = business_card_type_prices[card_type.value];

    //finally we return business_card_type_price
    return business_card_type_price;
}

//get ink type price from user input
function getBusinessCardInkTypePrice(){

    var business_card_ink_type_price=0;
    
    var theForm = document.forms["business-card-form"];
    var card_ink_type = theForm.elements["business-card-ink-type"];
    business_card_ink_type_price = business_card_ink_type_prices[card_ink_type.value];

    //finally we return business_card_ink_type_price
    return business_card_ink_type_price;
}

function calculateBusinessCardPrice(){

    var businessCardPrice = getBusinessCardSizePrice() + getBusinessCardTypePrice() + getBusinessCardInkTypePrice();
    
    //display the result
    var divobj = document.getElementById('business-card-total-price');
    divobj.style.display='block';
    divobj.innerHTML = "Total Price: $"+businessCardPrice;

}

function hideTotal(){

    var divobj = document.getElementById('business-card-total-price');
    divobj.style.display='none';
}