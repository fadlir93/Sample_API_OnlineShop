const db = require('../../config/db_config')
const Member = db.member
const nodemailer = require('nodemailer')
const jwtSimple = require('jwt-simple')
const hbs = require('express-handlebars')
require('dotenv').config();
let transporter = nodemailer.createTransport({
  // example with google mail service
  service: 'gmail',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
  user: emailAddress, // replace by your email to practice
  pass: passwordEmail // replace by your-password
  }
});




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

exports.forgot = (req, res) => {
    Member.findOne({
        where : {
            email : req.body.email,
        }
    }).then((result) => {

        let payload = {
            id : result.id,
            email : result.email
        }
        let secret = result.password

        let token = jwtSimple.encode(payload, secret)
        let link = 'http://localhost:7000/user/resetPassword/'+result.id+'/'+token+''
        console.log(link)
        var mailOptions = {
            from: 'fadlir93@gmail.com',
            to: result.email ,
            subject: 'reset password',
            html : '<h3>Dear '+result.username+' </h3>Silahkan klik link ini untuk proses ubah password selanjutnya  -> <a href='+link+'>link</a>'    
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error){ 
                return console.log(error);
            }
        });
        res.json("Silahkan buka email anda")
    })
}

exports.resetPassword = (req, res) => {

}