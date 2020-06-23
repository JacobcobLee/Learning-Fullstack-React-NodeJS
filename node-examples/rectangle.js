module.exports =(x,y,callback) => {
    if (x <= 0 || y <= 0){
 
        // reason for delay of 2000ms is to simulate database operation delay
        setTimeout(() => 
            callback(new Error("both rectangle dimensions should be greater than 0. Your length = "+ x + "and your breadth = " + y), null) , //will parse in string into error object as error message
            2000);
            //setTimeout function is to act as error handling in the if loop
    }else{
        setTimeout(() => 
            callback( null, 
                { //notice the 2 functions we are not parsing in params becasue they share it from the parent object with params x and y and callback
                    perimeter: () => (2*(x+y)),
                    area: () => (x*y)
                }) , //will parse back a javaSript object with 2 perimeters
            2000);
    }

}






