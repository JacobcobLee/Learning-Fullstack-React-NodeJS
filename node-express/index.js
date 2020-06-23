const express = require('express');
const http = require('http');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3001;

const app = express();
app.use(morgan('dev'));

//this line here states the root of the project and we can find the file at __dirname + /public
app.use(express.static(__dirname + '/public'));

//the next param is used to invoke middle ware that express needs to run
app.use((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1> this is an express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}`);
});