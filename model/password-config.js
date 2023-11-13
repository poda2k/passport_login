const user = require('./user') ;
const crypto = require('crypto') ;


function genPassword(password){

    var salt = crypto.randomBytes(32).toString('hex') ;
    var genHash = crypto.pbkdf2Sync(password ,salt,10000,64,'sha512').toString('hex') ; /// 10000 iterations and 64 length of the hash  
                                                                                        /// this line sync the hash with the password .
    return {
        salt : salt,
        hash : genHash
    };

}



function isValidPassword(password,hash,salt){
    var hashVerified = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex') ;
    return hash===hashVerified ;
}

module.exports = {
    genPassword ,
    isValidPassword
}