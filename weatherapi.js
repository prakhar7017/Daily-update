const express=require("express");
const https=require("https");
const app=express();

app.get("/",function(req,res){

    const url="https://api.openweathermap.org/data/2.5/weather?q=london&appid=7e20f9050428998a7eadd3df9084467c&units=metric";

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            let temp=weatherdata.main.temp;
            let weatherdescription=weatherdata.weather[0].description;
            let icon=weatherdata.weather[0].icon;
            let urlimage="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>the weather is currently-> "+weatherdescription+"</p>");
            res.write("<p>it feels like-> "+temp+"</p>");
            res.write("<img src="+urlimage+">");
            res.send();
        })

    });
});
app.listen(80,function(){
    console.log("server has started on port 80");
});