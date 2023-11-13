const express = require('express');
const parser = require('body-parser');
const DB_con = require('./model/connection');
const user = require('./model/user');
const home = require('./Routes/Home');
var passport = require('passport');
const crypto = require('crypto');
const Sessions = require('express-session') ;
const SeqSession = require('express-session-sequelize')(Sessions.Store);
require('./model/passport') ;

const app = express();

const SStore = new SeqSession({
    db : DB_con ,
    collection : 'sessions'
});

app.set('view engine','ejs');
app.set('Views' , 'views');

app.use(Sessions({
    secret : 'TOPSECRETshit' ,
    resave :  false ,
    saveUninitialized : false ,
    store : SStore ,
    cookie:{
        maxAge: 1000*60*60*24 
    }
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use(passport.initialize());
app.use(passport.session());
app.use(home);


app.use((req,res,next)=>{
    console.log(req.user) ;
    console.log(req.session);
    next();
})

// user.bulkCreate({
//     name : 'poda2k' ,
//     password : 'podas' ,
//     age: 23 ,
//     email : 'myemail@email.com'
// }).then(data=>{
//     console.log(data) ;
// }).catch(err=>{
//     console.log(err) ;
// })

DB_con.sync()
.then(successful => {
    app.listen(3000);
    console.log("all set");
}).catch(err=>{
    console.log("damn error");
})

