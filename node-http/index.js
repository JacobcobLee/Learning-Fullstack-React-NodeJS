const http = require('http');
const fs = require('fs'); //file system module
const path = require('path'); //path node module

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
//create server takes in 2 function request and response
    console.log("Request for "+ req.url +' by method ' + req.method);


    //this is how a get method will work in nodejs
    if(req.method == 'GET'){
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html'; //this line states if the client sends GET req to localhost3000 url, redirect to index.html
        else fileUrl = req.url;

        //find the .html file to load to client
        var filePath = path.resolve('./public' + fileUrl); //go into public folder
        const fileExt = path.extname(filePath); // find the file
        if (fileExt == '.html'){ //if the file is html
            fs.exists(filePath, (exists) => { 
                if(!exists){ //if file dont exist send error 404
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html> <body> <h1> Error 404 file not found : <h1>' + fileUrl +'</br><p>Sorry, the content you are looking for is not found</p> </body> </html>');

                    return;
                }else{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(res); //read in the html file and send it back to client
                }
            })
        } else{ //if file is not html
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html> <body> <h1> Error 404 file not html file :' + fileUrl +'<h1></br><p>Sorry, the content you are looking for is not an html file</p></body> </html>');

            return;
        }

    }else{ //if req method is not get 
        //if file is not html
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html> <body> <h1> Error 404 request method not supported :' + req.method +'<h1></br><p>Sorry, the request method is not supported</p></body> </html>');

        return;
    }









    // //next we construct the response obj
    // res.statusCode= 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end('<html><body><h1> henlo how ar yu? im under te water </br> pls halp mi  </br> here too much raining wrwrbrbrwrwrbrbr </h1> </body> </html>');
})

//to start the server we use server.listen
server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}`)
}); //server.lsten takes in 3 params port, hostname and a function