let express = require('express')
let router = express.Router()

router.get('/signup', function(req, res, next){
    res.render('user/signup');
});
  
// router.post('/signup', passport.authenticate('local.signup', {
//     failureRedirect: '/user/signup',
//     failureFlash: true
//   }), function(req, res, next) {
//       if (req.session.oldUrl) {
//           var oldUrl = req.session.oldUrl;
//           req.session.oldUrl = null;
//           res.redirect(oldUrl);
//     } else {
//           res.redirect('user/profile')
//     }
//   });


module.exports = router