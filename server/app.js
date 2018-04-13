var express= require("express");
var mysql=require("mysql");
var app= express();

var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"0000",
    database:"test"
});

app.get("/",function(req,res){
    // find count of  object ID in DB
    var q="SELECT COUNT(*) AS total FROM account";
    connection.query(q,function(err, result){
       if (err) throw err;
     var count=result[0].total;

     res.send("We have "+ count + " users in ");
    });
});

app.listen(8080, function(){
    console.log("Server running on 8080!");
})