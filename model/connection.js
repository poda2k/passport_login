const SEQ = require('sequelize') ;

const DB_con = new SEQ('rev_proj','root','',{dialect:"mysql" , host:"localhost"});

module.exports = DB_con;