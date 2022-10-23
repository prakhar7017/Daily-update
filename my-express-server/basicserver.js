const express=require("express");
const app=express();

app.get("/",function(req,res){
    res.send("this is the first server");
});


app.listen(80,function(){
    console.log("the server has started on port 80");
});