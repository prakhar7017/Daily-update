const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const validator=require("validator");

const userSchema=new mongoose.Schema({
    nickname:{
        type:String,
        required:true,
        validate(value) {
            if (validator.isEmpty(value)) {
              throw new Error("Nickname is Required");
            }
          },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Email Invalid");
            }
          },
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    last_logged_in:{
        type:Date,
        default:Date.now
    }
});


userSchema.methods.generateAuthToken=async function(){
    try {
        console.log(this._id)
        const token=jwt.sign({_id:this._id.toString},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}

userSchema.methods.generateresetToken=async function(){
    try {
        
        console.log(this._id.toString());

        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY,{
            expiresIn:"15m"
        });
        this.tokens=this.tokens.concat({token:token});
        return token;
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}





userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        // console.log(`the current password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        // console.log(`the current password is ${this.password}`);


        this.confirmpassword=await bcrypt.hash(this.password,10);;
    }

    next();

});

userSchema.pre("updateOne",async function(next){
    if(this.isModified("password")){
        // console.log(`the current password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        // console.log(`the current password is ${this.password}`);


        this.confirmpassword=await bcrypt.hash(this.password,10);;
    }

    next();

});

//Model 
const Register=mongoose.model("User",userSchema);

module.exports=Register;


// roles: {
//     type: [{
//         type: String,
//         enum: ['user', 'admin']
//     }],
//     default: ['user']
// },