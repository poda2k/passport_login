const user = require("../model/user");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passGen = require('../model/password-config');

exports.gethome = (req , res) =>{
    console.log("successful");
    res.render('signup');
}

exports.postINFO = async (req , res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;
    const age = req.body.age;

    const userinfo = await user.findOne({
        where:{
            email : email
        }
    });

    if(userinfo){
        res.json({massage:"user already exists"});
    }else if(password != passwordConfirmation) {
        res.json({massage:"password conflict"}) ;
    }else if (!userinfo || password === passwordConfirmation){
       const genratedPassword = passGen.genPassword(password);
        const insert = await user.create({
            username : username ,
            email : email,
            password : password ,
            age : age ,
            salt : genratedPassword.salt,
            hash : genratedPassword.hash
        }) ;
        if(insert){
            res.render('home',{
                user:req.user
            }) ;
        }
    }

}

exports.getLogin = (req,res)=>{
    res.render('login') ;
}

exports.getloginSucess = (req,res)=>{
    res.render('home',{
        user : req.user ,
        name : req.user.username
    })
}

exports.getLogout = (req,res)=>{
    res.render('logout') ;
}

exports.logOut = (req,res)=>{
    // req.passport.session.destroy((err) => {
    //     res.redirect('/login') ;
    // });

    req.logout((result)=>{
        console.log(result) ;
    });
    res.render('login') ;

}