var express = require ('express');
var app = express();

app.set('port', (process.env.PORT || 8081));

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

    
