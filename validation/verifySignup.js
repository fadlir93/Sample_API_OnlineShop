const db = require('../config/db_config')
const Member = db.member

checkDuplicateUserNameOrEmail = (req, res, next) => {
    Member.findOne({
        where : {
            username: req.body.username
        }
    }).then(username => {
        console.log(username)
        if(username) {
            res.send("username is already taken")
        }
        Member.findOne({
            where : {
                email: req.body.email
            }
        }).then(email => {
            if(email) {
                res.send("email is already taken")
            }
            next();
        })
    })
}


module.exports = checkDuplicateUserNameOrEmail