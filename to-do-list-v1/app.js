const express = require("express");
const bodyParser = require("body-parser");
const { application } = require("express");

const app = express();

app.get("/", function (req, res) {
  let today = new Date();
  let currentDay = today.getDate();
  if (currentDay === 6 || currentDay === 0) {
    res.send("It is Weekend");
  } else {
    res.send("BOOO..its a working day");
  }
});

app.listen(80, function () {
  console.log("server has started on port 80");
});
