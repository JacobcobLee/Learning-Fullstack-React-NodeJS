const express = require('express');
const bodyParser = require('body-parser');

//declare that dishRouter is a express.router method
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')//this statement is very impt it specifies the end point for all the CRUD method that will be happening here this is to avoid human error
.all((req, res, next) =>{ //callback function for all CRUD methods bc of app.all
    //when a req comes in i want to....
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();//next function simply means that there are still more CRUD methods to be executed after this one so parse res and req obj to the next CRUD method
})
//req and res params will be parsed into here
.get((req,res,next)=>{
    res.end('Will send all the dishes to you!');
})
//post method
.post((req,res,next)=>{
    res.end('Will add this dish: ' + req.body.name + 
    ' with details: ' + req.body.description);
})
//put method not supported yet bc no specific id is given
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported on existing /dishes/');
})
//delete method
.delete((req,res,next)=>{
    res.end('Deleting all dishes!');
});

module.exports = dishRouter;