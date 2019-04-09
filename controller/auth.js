var exports = module.exports = {}

exports.signup = function(req,res){
	res.render('user/signup', {message: req.flash('message')}); 
}
exports.signin = function(req,res){
	res.render('user/signin', {message: req.flash('message')}); 
}
exports.dashboard = function(req,res){
	res.render('user/dashboard', {message: req.flash('message'),user: req.user.username}); 
}
exports.logout = function(req,res){
  req.session.destroy(function(err) {
    res.redirect('/');
  });
}