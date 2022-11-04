const express = require("express");

const bodyParser = require("body-parser");

const morgan=require("morgan");

const https = require("https");

const request = require("request");

const app = express();

app.use(morgan("dev"));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  let firstname = req.body.fname;
  let lastname = req.body.lname;
  let email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/7d440cd9cd";

  const options = {
    method: "POST",
    auth: "prakhar:d5320f376415b23c3f5544a813d06c11-us14",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  res.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(80, function () {
  console.log("server has started on port 80");
});
