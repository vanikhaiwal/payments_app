const express = require('express');
const Router =  express.Router();
const mongoose = require('mongoose');
const {account, user} = require('../db.js')
const {AuthMiddleware}= require('../middleware.js')

Router.get('/balance',AuthMiddleware,async (req,res)=>{
try{
const findBalance = await account.findOne({userId: req.userId});
if(findBalance){
    res.json({balance: account.balance});
}else{
    res.json({error:'No Account found'});
}}catch(err){
    res.status(404).json({error: err});
}})

Router.post('/transaction',AuthMiddleware,async (res,req)=>{
    const{amount , toUser} = req.body;
    const session = await mongoose.startSession();
    try{
        const senderId = await account.findOne({userId:req.userId}).session(session);
        if(!account || balance<amount){
            await session.abortTransaction();
            session.endSession();
            return res.json({error:'No Account found'});
            
        }
        const ReceiverId = await account.findOne({userId: to}).session(session);
        if(!ReceiverId){
            await session.abortTransaction();
            session.endSession();
            return res.json({error:'Recipient Account not found'});

        }
        await account.updateOne({userId: req.userId},{$inc: {balance:-amount}}).session(session);
        await account.updateOne({userId: to},{$inc: {balance:amount}}).session(session);
        await session.commitTransaction();
        res.json({"msg":"Transfer Succesfull"});
        }catch(err){
            await session.abortTransaction();
            res.json({msg:'Internal error'});
        }
        finally{
            session.endSession();
        }
        
    }
)
module.exports = Router ;