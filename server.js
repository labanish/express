var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
var multer  = require('multer');

app.set('port', (process.env.PORT || 8081));
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer({ dest: '/tmp/'}));
app.use(express.static('public'));

//serve the registration form with get
app.get('/index', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
 })
//respond to get 
 app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })

 //post function
 app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })
 
 //file upload
 app.get('/upload', function (req, res) {
    res.sendFile( __dirname + "/" + "fileupload.htm" );
 })

 app.post('/file_upload', function (req, res) {
    console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type);
    var file = __dirname + "/" + req.files.file.name;
    
    fs.readFile( req.files.file.path, function (err, data) {
       fs.writeFile(file, data, function (err) {
          if( err ) {
             console.log( err );
             } else {
                response = {
                   message:'File uploaded successfully',
                   filename:req.files.file.name
                };
             }
          
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
    });
 })
 


app.get('/',function(req,res){
    res.send('hello world!');
    })

app.get('/list',function(req,res){
res.send("Name Listing");
})





    ///serve 
    app.listen(app.get('port'), function(){

        console.log("app listening at port " + app.get('port') );
    });

    
