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

app.listen(80, function () {
    console.log("server has started on port 80");
});