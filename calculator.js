const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/calculator.html");
});

app.post("/", function (req, res) {
    let num1 = Number(req.body.val1);
    let num2 = Number(req.body.val2);
    let ans = num1 + num2;
    res.send("the answer is-> "+ans);

});

app.get("/bmi",function(req,res){
    res.sendFile(__dirname+"/bmi.html");
});

app.post("/bmi",function(req,res){
    let wgt=parseFloat(req.body.weight);
    let hgt=parseFloat(req.body.height);
    let bmi=wgt/(hgt*hgt);

    res.send("your Bmi is-> "+bmi);
    
})


app.listen(3000, function () {
    console.log("server has started on port 3000");
});