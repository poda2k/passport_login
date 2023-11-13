const express = require('express') ;
const  passport = require('passport') ;
const router = express.Router();
const home = require('../controller/home');
const auth = require('../middleware/auth');


router.get('/signup',home.gethome );
router.get('/home',auth.valid,home.getloginSucess);
router.get('/login',home.getLogin);
router.get('/logout',auth.valid,home.getLogout);

router.post('/signup',home.postINFO);
router.post('/logout',auth.valid,home.logOut);
router.post('/login', passport.authenticate('local',{failureRedirect:'/login_faliure',successRedirect:'/home'}));


module.exports = router ;