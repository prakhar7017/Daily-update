const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://prakhar7017:mongodb123@cluster0.wjdnw0f.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection is successful");
}).catch((e)=>{
    console.log(e)
    console.log("no connection");
})
