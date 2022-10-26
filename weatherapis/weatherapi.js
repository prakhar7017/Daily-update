const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/weather.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const appid = "7e20f9050428998a7eadd3df9084467c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p> the weather in  " + query + " is " + weatherDescription + "</p>");
            res.write("<p> and it feels like " + temp + "</p>");
            res.write("<img src=" + imageurl + ">");
            res.send();

        })

    });
});

app.listen(80, function () {
    console.log("server has started on port 80");
});



