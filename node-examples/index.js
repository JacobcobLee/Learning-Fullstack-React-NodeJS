// this exercise we will be creating a SIMPle node module
//node modules are made of many JS files that require(import)/export functions.

var rect = require('./rectangle');
//we require the rectangle js file with the 2 functions that we created
//we will be using the functions to calculate the the perimeter and area of a rectangle

function solveRect(l,b){
    console.log("solving for rectangle with l = " + l + "and breadth = " + b)

    //in line 12 we can see obj rect has 3 parameters input, length l , breadth b and callback function
    rect(l,b,(err,rectangle) => {
        if(err){
            console.log("Error: ", err.message); //err.message parsed in from rectangle.js
        }else{
            console.log("The area of the rectangle l= "+ l +" and b= "+b+" is "+rectangle.area()); //notice we are not giving the retangle.area object any params, this is because it has alr been parsed in from the parent object, rect

            console.log("The perimeter of the rectangle l= "+ l +" and b= "+b+" is "+rectangle.perimeter());
        }
        //in this rect function, the loop will not be executed after the callback function is completed
    });

    //to demostrate the asynchronus function of Node, meaning node will do other task while i/o task (takes some time to load) are being completed we will do a console log message to prove that node handles other task while waiting for i/o operations to finish
    console.log("this statement is after the call to rect() which will display area and perimeter");
}

solveRect(2,4);
solveRect(6,9);
solveRect(5,6);