import express from "express";
import User from '../models/User.js'
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken"
const router = express.Router();


router.post("/register", async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    
       
    });
    
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err);   
    }    
})

// LOGIN ................

router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        
     !user && res.status(401).json("Username must be wrong")
         

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const ogPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

      ogPassword !== req.body.password && res.status(401).json("Wrong password")
      

        const accessToken = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SEC,
            {expiresIn:"1d"}
        )

        const {password, ...others} = user._doc

        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err);
    }

   
})

export default router
