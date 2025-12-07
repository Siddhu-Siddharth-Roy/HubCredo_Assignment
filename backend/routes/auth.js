const express = require("express");
const router = express.Router();
const User= require("../models/User");
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");


//Signup
router.post("/signup",async(req,res)=>{
    try{                                
        const{name ,email , password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields required"});
        }

        const userExists = await User.findOne({email});     
        if(userExists)return res.status(400).json({message:"Email already exists"});

        const hashed = await bcrypt.hash(password,10);

        const user = await User.create({name,email,password:hashed});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

        res.json({message:"Signup Successfull",token,user:{ id: user._id, name: user.name, email: user.email }});
    }
    catch(err){
           console.log(err);
        res.status(500).json({message:"Serevr error"});
    }
});

//Login
router.post("/login",async(req,res)=>{
    try{
            const{email,password}=req.body;

            const user = await User.findOne({email});
            if(!user) return res.status(404).json({message:"User not found!"});

            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(401).json({message:"Invalid Password"});

            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

            res.json({
            message: "Login Successful",
            token,
            user: { id: user._id, name: user.name, email: user.email },
            });
    }
    catch(err){
           console.log(err);
        res.status(500).json({message:"Server Error"});
    }
});

//Protected Route(Dashboard)
router.get("/dashboard",(req,res)=>{
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

        const token = authHeader.split(" ")[1];

          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          res.json({ message: "Welcome User", userId: decoded.id });


    }
    catch(err){
           console.log(err);
        res.status(401).json({message:"Invalid token"});
    }
});


module.exports = router;