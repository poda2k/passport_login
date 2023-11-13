const DB = require('./connection.js')
const SEQ = require('sequelize') ;
const bcrypt = require('sequelize-bcrypt');

const user = DB.define('user',{
    username:{
        type: SEQ.STRING ,
        allowNull : false
    },
    age : {
        type: SEQ.INTEGER ,
        allowNull : true
    },
    email : {
        type: SEQ.STRING ,
        allowNull : false
    },
    password : {
        type: SEQ.STRING ,
        allowNull : false
    },
    salt :{
        type: SEQ.STRING ,
        allowNull : false
    },
    hash:{
        type: SEQ.STRING ,
        allowNull : false
    }
});

bcrypt(user,{
    field:"password",
    rounds : 12 ,
    compare : "authenticated"
});




module.exports = 
    user
 ;