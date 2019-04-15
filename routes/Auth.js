var authController = require('../controller/auth');
const db = require('../config/db_config')
const Member = db.member
const bcrypt = require('bcryptjs')

module.exports = function(app,passport){
    app.get('/user/signup', authController.signup);
    app.get('/user/signin', authController.signin);
    app.post('/user/signup', passport.authenticate('local-signup',
        { 
            successRedirect: '/user/dashboard',
            successFlash : true,
            failureRedirect: '/user/signup',
            failureFlash : true,
            
        }
    ));
    app.get('/user/resetPassword/:id/:token',authController.resetPassword)
    app.post('/user/resetPassword', (req,res,next) => {
        Member.update({password : bcrypt.hashSync(req.body.password,8)}, {
            where : {
                id : req.body.id
            }
        }).then(() => {
            res.redirect('/')
        })
        console.log(req.params.id)
    })
    app.get('/user/failedreset', )
    app.get('/user/dashboard',isLoggedIn, authController.dashboard);
    app.get('/logout',authController.logout);

    app.post('/user/signin', passport.authenticate('local-signin',
        { 
            successRedirect: '/user/dashboard',
            failureRedirect: '/user/signin'
        }
    ));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){ 
            return next();
        }
        res.redirect('/user/signin');
    }
}