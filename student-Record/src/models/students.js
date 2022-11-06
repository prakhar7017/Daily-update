const mongoose=require("mongoose");
const validator=require("validator");

// --------------------------------------------------creating schemas -------------------------------------

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:4
    },
    student_number:{
        type:String,
        required:true,
        unique:[true,"Student Number already exist"],
        maxlength:7
    },
    student_Roll:{
        type:Number,
        required:true,
        unique:[true,"Student Roll Number already exist"],
        min:1,
        max:[50,"Invalid Student Roll"]
    },
    branch:{
        type:String
    },
    city:{
        type:String
    },
    cgpa:{
        type:Number,
        required:true,
        min:1,
        max:10
    }
});

//------------------------------------------------------- creating collection-------------------------------------------------

const Student= new mongoose.model("Student",studentSchema);


module.exports=Student;