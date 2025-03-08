const express =require("express")
const User=require("../models/User")
const bcrypt =require("bcryptjs")
const router=express.Router()

router.get("/",async (req,res)=>{
    try{
        const adminExists= await User.findOne({email:"chandu2438@gmail.com"})
        if (adminExists){
            return res.status(400).json({"message":"admin already existed"})
        }
        const hashedPassword=await bcrypt.hash("1234",10)
        const admin= new User({
            username:"chandu", 
            email:"chandu2438@gmail.com",
            password:hashedPassword,
            mobile:"7680807969",
            role:"admin"
        })
        await admin.save()
        res.json({"message":"Admin created",admin})
    }
    catch(err){
        console.log("internal server error from adminAuth",err)
        return res.status(500).json({"message":"internal server error from adminAuth"})
    }
})

module.exports= router