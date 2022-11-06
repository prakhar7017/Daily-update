const mongoose=require("mongoose");
const express=require("express");
const app=express();

// use cloud DB 
// or try re installing local server

mongoose.connect("mongodb://localhost:27017/fruitsDB", (err)=>{
    console.log(err);
})

const fruitSchema=new mongoose.Schema({
    name: String,
    rating:Number,
    review:String
});

const Fruit=mongoose.model("Fruit",fruitSchema);

const fruit=new Fruit({
    name:"Apple",
    rating:7,
    review:"pretty solid as a fruit."
});

fruit.save();


app.listen(80,function(){
    console.log("server has started");
})