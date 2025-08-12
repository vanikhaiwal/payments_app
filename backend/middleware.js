const jwt = require ('jsonwebtoken');
const {JWT_SECRET} = require('./config.js');

function AuthMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({msg:"error with authorization"});
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.userId=decoded.id;
        next();
    }catch(err){
        res.status(403).json({msg:"Session expired, please login again"});
    }
}
module.exports = {AuthMiddleware};