require('../model/passport');

exports.valid = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).json({msg:'access denied'});
    }
}