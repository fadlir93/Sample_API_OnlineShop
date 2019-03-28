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
