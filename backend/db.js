const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;



const userSchema = new mongoose.Schema({
    username : {type:String, required: true},
    password: {type:String, required:true},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true}
})

const accountSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : true
    },
    balance : {
            type : Number,
            required : true
    }
})
const transactionSchema= new mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : true
    },
    receiverId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : true
    },
    amount :{
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default: Date.now
    }
})
const requestSchema = new mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: 'true'
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: 'true'
    },
    amount: {
        type: Number,
        required: true
    },
    status : {
        type: String,
        required: true
    },
    date :{
        type: Date,
        default: Date.now
    }

})
const user = mongoose.model('user',userSchema);
const account = mongoose.model('account',accountSchema)
const transaction = mongoose.model('transaction',transactionSchema);
const requestMoney= mongoose.model('requestMoney',requestSchema);
module.exports=  {user, account ,transaction, requestMoney};