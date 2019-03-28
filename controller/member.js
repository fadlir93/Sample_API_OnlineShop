const db = require('../config/db_config')
const Member = db.member

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
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
        res.send("Member success created")
    })
}

exports.signin = (req, res) => {
    console.log("sign-in")
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
        var token = jwt.sign({id: Member.id}, 'fadli-ramadhan', {expiresIn: 86400 })
        console.log(token)
        res.status(200).send({auth: true, accessToken: token})
    }).catch(err => {
        console.log(err)
        res.status(500)
    })
}