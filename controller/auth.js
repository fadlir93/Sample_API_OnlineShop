const jwtSimple = require('jwt-simple')
const db = require('../config/db_config')
const Member = db.member
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

exports.resetPassword = function(req, res){
  Member.findByPk(req.params.id)
  .then(member => {
    let payload = jwtSimple.decode(req.params.token, member.password)
    if(payload){
      res.render('user/resetPassword', {token: req.params.token, id: req.params.id})
    }else {
      res.render('user/failedPassword')
    }
  })
}

exports.logout = function(req,res){
  req.session.destroy(function(err) {
    res.redirect('/');
  });
}