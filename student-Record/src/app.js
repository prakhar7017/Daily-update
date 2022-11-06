const express = require("express");

require("./db/connection");

const Student = require("./models/students");

const app = express();

app.use(express.json());

//-----------------------------------------------------------------create a new student--------------------------------------------------
app.post("/student",async (req, res) => {
    try{
        const user = new Student(req.body);
        const adduser=await user.save();
        res.status(201).send(adduser);
    }catch(e){
        res.status(400).send(e);
    }
  });

//--------------------------------------------------------------- create multiple stuednts---------------------------------------------- 
  app.post("/students",async (req,res)=>{
    try {
        const users=req.body;
        const addusers=await Student.insertMany(users);
        res.status(201).send(addusers);
        
    } catch (e) {
        res.status(400).send(e);
        
    }
  })

//---------------------------------------------------------------   Display Records-------------------------------------------------------- 
app.get("/students",async(req,res)=>{

    try{
       const studentsData=await Student.find();
       res.send(studentsData);
    }catch(e){
        res.send(e);
    }
});


//--------------------------------------------------------- fetching perticular student using Student Roll Number -----------------------
app.get("/student/:student_Roll",async(req,res)=>{

    try {
        const studentRoll=req.params.student_Roll;
        const studentData=await Student.findOne({student_Roll:studentRoll});
        console.log(studentData);

        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
        
    } catch (e) {
        res.send(e);
    }
});


//------------------------------------------------- Delete Student by Student Roll Number----------------------------------------------
app.delete("/student/:studentroll",async(req,res)=>{

    try {
        const studentRoll=req.params.studentroll;
        const studentData=await Student.findOneAndDelete({student_Roll:studentRoll});
        console.log(studentData);

        if(!studentData){
            return res.status(400).send();
        }else{
            res.send(studentData);
        }
    } catch (e) {
        res.status(500).send(e);
        
    }
});


// ------------------------------------------Update Student Records using Student Roll Number.-----------------------------------
app.patch("/student/:Studentroll",async(req,res)=>{
    try {
        const studentRoll=req.params.Studentroll;
        console.log(studentRoll);
        const updateStudents=await Student.findOneAndUpdate({student_Roll:studentRoll},req.body,{
            new:true
        });
        console.log(updateStudents);
        res.send(updateStudents);
        
    } catch (e) {
        
        res.status(400).send(e);
    }

});



//----------------------------------------------------- fetching top n students-------------------------------------------------------- 
app.get("/students/:toppers",async(req,res)=>{
   try {
    const topnStudents=req.params.toppers;
    const result=await Student.find().sort({cgpa:1}).limit(topnStudents);
    console.log(result);
    res.send(result);
    
   } catch (e) {
    res.send(400).send(e);
   }
}); 



//-------------------------------------------------------- fetching bottom n students ----------------------------------------------
app.get("/student/students/:bottom",async(req,res)=>{
    try {
     const bottomnStudents=req.params.bottom;
     const result=await Student.find().sort({cgpa:-1}).limit(bottomnStudents);
     console.log(result);
     res.send(result);
     
    } catch (e) {
     res.send(400).send(e);
    }
 });


 
//----------------------------------------------------------- Delete all Students Records----------------------------------------------
app.delete("/students",async(req,res)=>{
    try {
        const deleteData=await Student.deleteMany();
        console.log(deleteData);
        res.send(deleteData);
    } catch (e) {
        res.status(500).send(e);   
    }
});

//----------------------------------------------------  Replacing record----------------------------------------------------------------- 
app.put("/student/:Studentroll",async(req,res)=>{
    try {
        const studentRoll=req.params.Studentroll;
        const newStudent=req.body;
        const replaceStudent=await Student.findOneAndReplace({student_Roll:studentRoll},newStudent,{
            new:true
        });
        console.log(replaceStudent);
        res.send(replaceStudent);
    } catch (e) {
        res.status(400).send(e);
    }
})


app.listen(process.env.PORT || 3000, () => {
  console.log("connected");
});
