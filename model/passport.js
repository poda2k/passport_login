const passport = require('passport') ;
const LocalStrategy = require('passport-local').Strategy ;
const connection = require('./connection');
const user = require('./user');
const passSecurity = require('./password-config');

const VerifyCheck = (username, password, callback) =>{

    user.findOne({where:{username: username}})
    .then(user=>{
        if(!user) {return callback(null,false);}

        const isValid = passSecurity.isValidPassword(password ,user.hash,user.salt);//isValidPassword(password ,user.hash,user.salt) ;

        if(isValid) {return callback(null , user);}
        else {return callback(null, false) ;}
    }).catch(err=>{
         callback(err) ;
    })
}


const Strategy = new LocalStrategy(VerifyCheck);

passport.use(Strategy) ;

passport.serializeUser((user,callback) =>{    // this function attach the user with this ID to the session body so i can access it anywhere
    callback(null,user.id) ;
}); 

passport.deserializeUser((userID,callback) =>{    // for attach the user with this ID to the req body
    user.findByPk(userID)
    .then((user)=>{
        console.log('user')
        console.log(user);
        callback(null,user);
    }).catch(err=>{
        callback(err) ;
    })
})