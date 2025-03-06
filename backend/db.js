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
const user = mongoose.model('user',userSchema);
const account = mongoose.model('account',accountSchema)
module.exports=  {user,account};