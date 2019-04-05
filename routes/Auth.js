var authController = require('../controller/auth');

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