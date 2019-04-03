let express = require('express')
let router = express.Router()
let db = require('../config/db_config')
let Member = db.member
let bcrypt = require('bcryptjs');
let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
let checkDuplicateUsernameAndEmail = require('../validation/verifySignupForm')

router.get('/signup', function(req, res, next){
    res.render('user/signup', {messages : req.flash('fail')});
});

router.post('/signup',checkDuplicateUsernameAndEmail, function(req, res, next) {
    if(!re.test(req.body.email)){
        req.flash('fail', 'email yang anda masukkan salah')
        return res.redirect('/user/signup')
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
    res.render('user/signin', {messagesSuccess: req.flash('success'), messagesFail: req.flash('fail')});
});

router.post('/signin', function(req, res, next) {
    Member.findOne({
        where : {
            username : req.body.username,
        }
    }).then(username => {
        if(!username) {
            req.flash('fail', 'Username yang anda masukkan salah')
            return res.redirect('/user/signin')
        }
        var passwordValid = bcrypt.compareSync(req.body.password, username.password);
        if(!passwordValid) {
            req.flash('fail', 'Password yang anda masukkan salah')
            return res.redirect('/user/signin')
        }
        var token = jwt.sign({id: username.id}, 'fadli-ramadhan', {expiresIn: 86400 })
        req.flash('success', 'Berhasil Login')
        return res.redirect('/user/signin')
        res.status(200).send({auth: true, accessToken: token})
    }).catch(err => {
        console.log(err)
        res.status(500)
    })
})
// router.post('/signin', function(req, res, next) {
//     res.
// })
module.exports = router