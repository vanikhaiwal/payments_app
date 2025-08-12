const express=require('express');
const {user,account} = require('../db.js');
const router = express.Router();
const z = require('zod');

const {AuthMiddleware} = require('../middleware.js')
const {JWT_SECRET} = require('../config.js')
const jwt = require('jsonwebtoken')


const signupBody = z.object({
    username : z.string().email(),
    password : z.string(),
    firstName : z.string(),
    lastName :  z.string()
})
const signinBody = z.object({
    username : z.string().email(),
    password : z.string()
})
const updateBody = z.object({
    password : z.string().optional(),
    firstName : z.string().optional(),
    lastName : z.string().optional()
})

router.post('/signup',async (req,res)=>{
    try{
    const signupData = req.body;
    const result = signupBody.safeParse(signupData);
    if(!result.success){
        return res.status(411).json({message : "Incorrect inputs"})
    }
    const userData = await user.findOne({username: signupData.username})
    if(userData){
        return res.status(409).json({message : "Email already exists"})
    }
    const newUser = await user.create({
        username: signupData.username,
        password : signupData.password,
        firstName : signupData.firstName,
        lastName : signupData.lastName,
    });
    console.log("user created successfully");
    const userId = newUser._id; 
    const accountData = await account.create({
         userId,
        balance : 1+ Math.random()*10000
    })
    const token = jwt.sign({id:userId},JWT_SECRET,{expiredIn: '1h'});
    res.status(200).json({msg:"user created successfully",token:token})
}catch(err){
    console.log(err);
    res.status(400).send("error");
}

});

router.post('/signin',async (req,res)=>{
    try{
        const signinData= req.body;
        const result= signinBody.safeParse(signinData);
        if(!result.success){
            return res.status(400).json({message : "Incorrect inputs"})
        }
        const findUser = await user.findOne({
            username:signinData.username,
            password: signinData.password});
            if(findUser){
                console.log("user logged in successfully");
                const token = jwt.sign({id : findUser._id},JWT_SECRET,{expiresIn: '1h'});
                  res.json( { token: token
                })}
                else {
                    return res.status(404).json({message : "User not found"})
                }
            }
        catch(err){
            console.log(err);
            res.status(404).send("error");
        
    }
});

router.put('/edit/:id',async (req,res)=>{
    try{
    const {id} = req.params;
     const updateData = req.body;
     const result = updateBody.safeParse(updateData);
        if(!result.success){
            return res.json("Incorrect Inputs")
        }
        const findUser = await user.findByIdAndUpdate(id,updateData, {new:true});
        if(!findUser){
            return res.status(404).json({message : "User not found"})
        }
    res.json({findUser,"msg":"user updated successfully"});
    console.log("user updated successfully");
}catch(err){
    console.log(err);
    res.status(400).send("error");
}});

router.get('/search',AuthMiddleware,async(req,res)=>{
   const filter = req.query.filter || "";
   const users= await user.find({
    $or: [{
        firstName:{
            "$regex":filter,
            "$options" : "i"
        }},{
        lastName:{
            "$regex":filter,
            "$options" : "i"
        }
    }

    ]
   })
   res.json({
    user: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id 
    }))
});
});

router.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).send("error");
})
module.exports = router;