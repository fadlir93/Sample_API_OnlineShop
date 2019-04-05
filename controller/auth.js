var exports = module.exports = {}
const db = require('../config/db_config')
const member = db.member
exports.signup = function(req,res){
	res.render('user/signup', {message: req.flash('message')}); 
}
exports.signin = function(req,res){
	res.render('user/signin', {message: req.flash('message')}); 
}
exports.dashboard = function(req,res){
	res.render('user/dashboard', {user: req.user.username}); 
}
exports.logout = function(req,res){
  req.session.destroy(function(err) {
    res.redirect('/');
  });
}