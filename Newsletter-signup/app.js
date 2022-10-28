const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){
    let firstname=req.body.fname;
    let lastname=req.body.lname;
    let email=req.body.email;

    console.log(firstname,lastname,email)
})


app.listen(80, function () {
    console.log("server has started on port 80");
});