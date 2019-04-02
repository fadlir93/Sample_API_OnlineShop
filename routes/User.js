let express = require('express')
let router = express.Router()
let db = require('../config/db_config')
let Member = db.member
let bcrypt = require('bcryptjs');
let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const validationUsernameAndEmail = require('../validation/verifySignup')


router.get('/signup',function(req, res, next){
    res.render('user/signup');
});

router.post('/signup', [validationUsernameAndEmail],  function(req, res, next) {
        if(!re.test(req.body.email)){
            return res.redirect("/")
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
            res.redirect("/")
        })
})

router.get('/signin', function(req, res, next){
    res.render('user/signin');
});

router.post('/signin', function(req, res, next) {
    Member.findOne({
        where : {
            username : req.body.username,
        }
    }).then(username => {
        if(!username) {
            res.send("Username not found ")
        }
        var passwordValid = bcrypt.compareSync(req.body.password, username.password);
        console.log()
        if(!passwordValid) {
            return res.status(401).send({
                auth : false,
                accessToken : null,
                reason: 'Invalid Password'
            })
        }
        var token = jwt.sign({id: username.id}, 'fadli-ramadhan', {expiresIn: 86400 })
        console.log(token)
        res.status(200).send({auth: true, accessToken: token})
    })
})

module.exports = router