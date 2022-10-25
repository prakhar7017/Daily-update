const express=require("express");
const https=require("https");
const app=express();

app.get("/",function(req,res){

    const url="https://api.openweathermap.org/data/2.5/weather?q=london&appid=7e20f9050428998a7eadd3df9084467c&units=metric";

    https.get(url,function(response){
        console.log(response.statusCode);

    });

    res.send("the server has started");
});
app.listen(80,function(){
    console.log("server has started on port 80");
});