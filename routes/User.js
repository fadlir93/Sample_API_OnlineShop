let express = require('express')
let router = express.Router()
let db = require('../config/db_config')
let Member = db.member
let bcrypt = require('bcryptjs');
let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


router.get('/signup', function(req, res, next){
    res.render('user/signup');
});

router.post('/signup', function(req, res, next) {
    if(!re.test(req.body.email)){
        return res.json({
            message : "Email Wrong",
            code: 404
        });
    }
        Member.create({
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password, 8),
            email : req.body.email,
            fullname : req.body.fullname,
            address : req.body.address,
            phone : req.body.phone,
            gender : req.body.gender,
            birthdate : req.body.birthdate
        }).then(() => {
            // res.json("Member success created")
            req.flash('success', 'Successfully Create Member.');
            res.redirect("/user/signin")

        })
})

router.get('/signin', function(req, res, next){
    res.render('user/signin', {messages: req.flash('success')});
});


module.exports = router