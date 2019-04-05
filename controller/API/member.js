const db = require('../../config/db_config')
const Member = db.member

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
exports.signup = (req, res, next) => {
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
            res.json("berhasil di tambah")
        }).catch((err) => {
        }
    )
}

exports.signin = (req, res) => {
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
        let id = {
            id : username.id
        }
        console.log(id)
        res.status(200).send({auth: true, accessToken: token})
    }).catch(err => {
        console.log(err)
        res.status(500)
    })
}