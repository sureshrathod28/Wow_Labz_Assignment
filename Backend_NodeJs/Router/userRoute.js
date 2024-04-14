const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const smtpTransport=require("nodemailer-smtp-transport")
const {userSchema}=require('../Models/userSchema')
const router=express.Router()
require('dotenv').config()


router.post('/register',async(req,res)=>{
     const {name,email,phone,password}=req.body
     try{
     const extisingUser=await userSchema.findOne({email:email})
     if(extisingUser){
       return res.status(400).json({error:"User already exists"})
     }
     const hashPassword=await bcrypt.hash(password,10)
     const newUser=new userSchema({
           name,
           email,
           phone,
           password:hashPassword
     })
     await newUser.save()
     return res.status(200).json({message:"User registered successfully"})

     }catch(error){
    return res.status(500).json({error:"Failed to register!"})
     }
})
router.post("/signin",async(req,res)=>{
     const {email,password}=req.body
     if(!email || !password){
      return  res.json({message:"All fields are required"})
     }
     userSchema.findOne({email:email}).then((user)=>{
        if(!user){
            res.status(400).json({error:"User not found"})
        }
        bcrypt.compare(password,user.password).then((isMatch)=>{
            if(!isMatch){
                res.status(400).json({error:"Invalid password"})
            }
            const token=jwt.sign(
                {id:user._id,email:user.email},
                process.env.SECRET_KEY
            )
            res.json(token)
       
        }).catch((err) => console.log(err));
     }).catch((err) => console.log(err));
})

router.post("/forgot-password",async(req,res)=>{
    const {email}=req.body
    try{
        const user=await userSchema.findOne({email})
        if(!user){
            res.status(400).json({error:"User doesn't exists"})
        }
     
        const resetToken=jwt.sign({id:user._id},process.env.RESET_SECRET_KEY,{expiresIn:'1h'})
        user.resetToken=resetToken
        await user.save()

        const resetLink=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`
        const transporter=nodemailer.createTransport(
            smtpTransport({
                service:'Gmail',
                auth:{
                    user:'lingyanaikrathod7276@gmail.com',
                    pass:`${process.env.GMAIL_PASS}`
                }
            })
        )
        const mailOptions={
            from:'lingyanaikrathod7276@gmail.com',
            to:email,
            subject:'Password Reset',
            text:`To reset your password,click on the link ${process.env.FRONTEND_URL}/reset-password/${resetToken}`
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error)
                return res.status(500).json({message:"Email could't be sent"})
            }else{
                console.log(`Email sent : ${info.response}`)
                return res.status(200).json({message:"Email sent successfully"})
            }
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Server error"})
    }
})

router.post("/reset-password/:token",async(req,res)=>{
    const {token}=req.params
    const {newPassword}=req.body
    try{
        const decodedToken=jwt.verify(token,process.env.RESET_SECRET_KEY)
        const user=await userSchema.findById(decodedToken.id)

        if(!user){
            return res.status(400).json({error:"Invalid token"})
        }
        const hashPassword=await bcrypt.hash(newPassword,10)
        user.password=hashPassword
        user.resetToken=null
        await user.save()
        return res.status(200).json({message:"Password reset successfully"})
    }catch (error){
       return res.status(400).json({error:"Invalid or expired token"})
    }
})
module.exports=router