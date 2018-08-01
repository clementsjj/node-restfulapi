//Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

//Create Server
var server = http.createServer(function(req, res){
    res.end('Hello World\n');
    
    //Get the URL and parse it
    //When we say 'True', we are telling it to parse the query string, which means to set the parsedurl.query value at the equivalent as if we have sent this data to the query string module
    //these two modules work together
    var parsedURL = url.parse(req.url, true);
    
    //Get the path of the Parsed URL object
    //untrimmed path that the user requested
    //parsedUrl will contain all sorts of data, pathname is the route we want but untrimmed.
    var path = parsedURL.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'')
    
    //Get the query string as an object
    var queryStringObject = parsedURL.query;


    //get HTTP method
    var method = req.method.toLowerCase();

    //Get the headers as an object
    var headers = req.headers

    //Get the payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data);
    }); 
    req.on('end', function(){
        buffer += decoder.end();

        //Send the Response in console
        console.log('Request Recieved with payload:\n', buffer);
        console.log('-------');    
        console.log('Request recieved with headers:\n', headers);
        console.log('-------');
        console.log('Request recieved on path: ' +trimmedPath+ 'with method: '+method+ ' and with these query string parameters: ' ,queryStringObject);
        console.log('*******************************************************')
        //Log the path that the person was asking for    
    });
});

server.listen(3000, function(){
    console.log('Server listening on port 3000');
})

//Change