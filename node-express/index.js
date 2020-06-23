const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3001;

const app = express();
//whenever we need to use a middleware we put app.use(middle ware)
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); //points to the html files

// this statement here show how to use a router module. What this stement means is any request for /dishes , dishRouter module will be used.
app.use('/dishes', dishRouter);


////////////////////////////////////////////////////
//                  Crud Methods                  //
////////////////////////////////////////////////////
// '/dishes'

// app.all('/dishes', (req, res, next) =>{ //callback function for all CRUD methods bc of app.all
//     //when a req comes in i want to....
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();//next function simply means that there are still more CRUD methods to be executed after this one so parse res and req obj to the next CRUD method
// });
// //req and res params will be parsed into here
// app.get('/dishes', (req,res,next)=>{
//     res.end('Will send all the dishes to you!');
// });
// //post method
// app.post('/dishes', (req,res,next)=>{
//     res.end('Will add this dish: ' + req.body.name + 
//     ' with details: ' + req.body.description);
// });
// //put method not supported yet bc no specific id is given
// app.put('/dishes', (req,res,next)=>{
//     res.statusCode = 403;
//     res.end('Put operation not supported on existing /dishes/');
// });
// //delete method
// app.delete('/dishes',(req,res,next)=>{
//     res.end('Deleting all dishes!');
// });

////////////////////////////////////////////////////
//                  Crud Methods                  //
////////////////////////////////////////////////////
// '/dishes/:Id'

//putting a colon after a resources in a url will allow express to extract the value
                    
// /sampleResource/:valueX
//                 ^ colon over here! 
//req and res params will be parsed into here
app.get('/dishes/:dishId', (req,res,next)=>{
    res.end(`Will send details of the dish: ${req.params.dishId} to you!`);
});
//post method
app.post('/dishes/:dishId', (req,res,next)=>{
    res.statusCode = 403;
    res.end('Post operation not supported on existing /dishes/'+req.params.dishId);
});
//put method not supported yet bc no specific id is given
app.put('/dishes/:dishId', (req,res,next)=>{
    res.write(`Updating the dish: ${req.params.dishId} \n`);
    res.end('Will update the dish: '+req.body.name + ' with ' + req.body.description);
});
//delete method
app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end(`Deleting dish: ${req.params.dishId}`);
})

////////////////////////////////////////////////////
//              find file to serve                //
////////////////////////////////////////////////////

//this line here states the root of the project and we can find the file at __dirname + /public
app.use(express.static(__dirname + '/public'));

//the next param is used to invoke middle ware that express needs to run
app.use((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    //res.end is the display for the server
    res.end('<html><body><h1> this is an express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}`);
});