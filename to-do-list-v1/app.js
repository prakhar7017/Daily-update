const express = require("express");
const ejs=require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine","ejs");

app.get("/", function (req, res) {
  let today =new Date();
  let currentDay = today.getDay();
  console.log(currentDay);
  let day=""
  switch (currentDay) {
    case 0:
      day="Sunday";
      break;
    case 1:
      day="Monday";
      break;
    case 2:
      day="Tuesday";
      break;
    case 3:
      day="Wednesday";
      break;
    case 4:
      day="Thusday";
      break;
    case 5:
      day="Friday";
      break;
    case 6:
      day="Saturday";
      break;
  
    default:
      break;
  }
  res.render("list",{kindofday:day})
});


app.listen(80, function () {
  console.log("server has started on port 80");
});
