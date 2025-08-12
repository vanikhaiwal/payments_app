const express = require('express');
const Router =  express.Router();
const mongoose = require('mongoose');
const {account, user, transaction, requestMoney} = require('../db.js')
const {AuthMiddleware}= require('../middleware.js')


Router.get('/balance',AuthMiddleware,async (req,res)=>{
try{
const findBalance = await account.findOne({userId: req.userId});
if(findBalance){
    res.status(200).json({balance: findBalance.balance});
}else{
    res.status(404).json({error:'No Account found'});
}}catch(err){
    res.status(500).json({error: err});
}})

Router.post('/transaction',AuthMiddleware,async (req,res)=>{
    const{amount , toUser} = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const senderId = await account.findOne({userId:req.userId}).session(session);
        if(!senderId || senderId.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({error:'Insufficient Balance or No Account found'});
            
        }
        const ReceiverId = await account.findOne({userId: toUser}).session(session);
        if(!ReceiverId){
            await session.abortTransaction();
            return res.status(404).json({error:'Recipient Account not found'});

        }
        await account.updateOne({userId: req.userId},{$inc: {balance:-amount}}).session(session);
        await account.updateOne({userId: toUser},{$inc: {balance:+amount}}).session(session);
        await session.commitTransaction();
        res.json({"msg":"Transfer Succesfull"});
        await transaction.create({
            senderId: req.userId,
            receiverId: toUser,
            amount: amount,
        })
        }catch(err){
            await session.abortTransaction();
            res.json({msg:'Internal error'});
        }
        finally{
            session.endSession();
        }
            }

)
Router.get('/transactionhistory',AuthMiddleware, async (req,res)=>{
    try{
        const transactions= await transaction.find({
            $or: [
                {senderId: req.userId},
                {receiverId: req.userId}
            ]}).sort({date: -1}).populate('senderId', 'firstName lastName _id').populate('receiverId', 'firstName lastName _id');
            res.status(200).json({transactions});
    }catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

});
Router.post('/requestMoney',AuthMiddleware, async(req,res)=>{
    const {amount,status, receiverId}= req.body;
    try{
        const request = await requestMoney.create({
            senderId: req.userId,
            receiverId: receiverId,
            amount:amount,
            status:status
        })
        res.status(200).json({request})
    }catch (err){
        res.status(500).json({ error: 'Internal error'})
        console.log(err);
        toast.error("Failed to fetch requests");
    }
})
Router.get('/requests',AuthMiddleware,async(req,res)=>{
    try{
        const requests= await requestMoney.find({
            receiverId: req.userId
               }).populate('senderId','firstName lastName _id').populate('receiverId','firstName lastName _id');
               res.status(200).json({requests, "msg":"Requests fetched successfully"});
}catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
Router.post('/Request-status',async(req,res)=>{
    const {requestId, status} = req.body;
    try{
    const response= await requestMoney.findByIdAndUpdate(
        requestId,
        {status: status},
        {new: true}
    )
    res.json({response,"msg":"Request status updated successfully"});}
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = Router;