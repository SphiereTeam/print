/*
This source is shared under the terms of LGPL 3
www.gnu.org/licenses/lgpl.html

You are free to use the code in Commercial or non-commercial projects
*/

//Set up an associative array
//The keys represent the size of the paper
//The values represent the cost of the paper
var paper_size_prices = new Array();
paper_size_prices["None"]=0;
paper_size_prices["Size 1"]=20;
paper_size_prices["Size 2"]=25;
paper_size_prices["Size 3"]=35;
paper_size_prices["Size 4"]=75;
paper_size_prices["Size 5"]=80;

//Set up an associative array 
//The keys represent the paper type
//The value represents the cost of the paper type
//We use this this array when the user selects a paper type from the form
var paper_type_prices= new Array();
paper_type_prices["None"]=0;
paper_type_prices["Type 1"]=5;
paper_type_prices["Type 2"]=5;
paper_type_prices["Type 3"]=7;
paper_type_prices["Type 4"]=8;
paper_type_prices["Type 5"]=10;

//Set up an associative array 
//The keys represent the ink type
//The value represents the cost of the ink type
//We use this this array when the user selects an ink type from the form
var ink_type_prices= new Array();
ink_type_prices["None"]=0;
ink_type_prices["Ink 1"]=5;
ink_type_prices["Ink 2"]=5;
ink_type_prices["Ink 3"]=7;
ink_type_prices["Ink 4"]=8;
ink_type_prices["Ink 5"]=10;
 
// getPaperSizePrice() finds the price based on the size of the paper.
// Here, we need to take user's the selection from the dropdown provided
function getPaperSizePrice()
{  
    var paper_size_price=0;
    //Get a reference to the form id="paperform"
    var theForm = document.forms["paperform"];
    //Get a reference to the paper size the user chooses
    var paper_size = theForm.elements["paper_size"];
    paper_size_price = paper_size_prices[paper_size.value];

    //Here since there are 4 radio buttons selectedCake.length = 4
    //We loop through each radio buttons
    //for(var i = 0; i < selectedCake.length; i++)
    //{
        //if the radio button is checked
        //if(selectedCake[i].checked)
        //{
            //we set paper_size_price to the value of the selected radio button
            //i.e. if the user choose the 8" cake we set it to 25
            //by using the paper_size_prices array
            //We get the selected Items value
            //For example paper_size_prices["Round8".value]"

            //paper_size_price = paper_size_prices[selectedCake[i].value];

            //If we get a match then we break out of this loop
            //No reason to continue if we get a match

            //break;
        //}
    //}

    //We return the paper_size_price
    return paper_size_price;
}

//This function finds the paper type price based on the 
//drop down selection
function getPaperTypePrice()
{
    var paper_type_price=0;
    //Get a reference to the form id="paperform"
    var theForm = document.forms["paperform"];
    //Get a reference to the select id="paper_type"
    var paper_type = theForm.elements["paper_type"];
     
    //set paper_type_price equal to value user chose
    paper_type_price = paper_type_prices[paper_type.value];

    //finally we return paper_type_price
    return paper_type_price;
}

//This function finds the ink type price based on the 
//drop down selection
function getInkTypePrice()
{
    var ink_type_price=0;
    //Get a reference to the form id="paperform"
    var theForm = document.forms["paperform"];
    //Get a reference to the select id="ink_type"
    var ink_type = theForm.elements["ink_type"];
     
    //set ink_type_price equal to value user chose
    ink_type_price = ink_type_prices[ink_type.value];

    //finally we return ink_type_price
    return ink_type_price;
}

//candlesPrice() finds the candles price based on a check box selection
function candlesPrice()
{
    var candlePrice=0;
    //Get a reference to the form id="paperform"
    var theForm = document.forms["paperform"];
    //Get a reference to the checkbox id="includecandles"
    var includeCandles = theForm.elements["includecandles"];

    //If they checked the box set candlePrice to 5
    if(includeCandles.checked==true)
    {
        candlePrice=5;
    }
    //finally we return the candlePrice
    return candlePrice;
}

function insciptionPrice()
{
    //This local variable will be used to decide whether or not to charge for the inscription
    //If the user checked the box this value will be 20
    //otherwise it will remain at 0
    var inscriptionPrice=0;
    //Get a refernce to the form id="paperform"
    var theForm = document.forms["paperform"];
    //Get a reference to the checkbox id="includeinscription"
    var includeInscription = theForm.elements["includeinscription"];
    //If they checked the box set inscriptionPrice to 20
    if(includeInscription.checked==true){
        inscriptionPrice=20;
    }
    //finally we return the inscriptionPrice
    return inscriptionPrice;
}
        
function calculateTotal()
{
    //Here we get the total price by calling our function
    //Each function returns a number so by calling them we add the values they return together
    //var cakePrice = getPaperSizePrice() + getPaperTypePrice() + getInkTypePrice() + candlesPrice() + insciptionPrice();
    var cakePrice = getPaperSizePrice() + getPaperTypePrice() + getInkTypePrice();
    
    //display the result
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
    divobj.innerHTML = "Total Price: $"+cakePrice;

}

function hideTotal()
{
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='none';
}