const express = require("express");
const ejs=require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({extended:false})); 
app.use(express.static("public"));
app.set("view engine","ejs");

let newAdds=["Buy Food","Cook Food","Eat Foods"];
let workitems=[];

app.get("/", function (req, res) {
  let today =new Date();


  let option={
    weekday:"long",
    day:"numeric",
    month:"long"
  }

  let day=today.toLocaleDateString("en-US",option);

  res.render("list",{listTitle:day,newlistitems:newAdds})
});

app.post("/",(req,res)=>{
  let item=req.body.new_item;
  if(req.body.list==="work list"){
    workitems.push(item);
    res.redirect("/work");
  }else{
    newAdds.push(item);
    res.redirect("/");
  }

});

app.get("/work",(req,res)=>{
  res.render("list",{listTitle:"work list",newlistitems:workitems});
});
app.get("/about",(req,res)=>{
  res.render("about");
})


app.listen(3000, function () {
  console.log("server has started on port 80");
});
