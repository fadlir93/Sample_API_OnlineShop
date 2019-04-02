const db = require('../config/db_config')
const Member = db.member

checkDuplicateUserNameOrEmail = (req, res, next) => {
    Member.findOne({
        where : {
            username: req.body.username
        }
    }).then(username => {
        if(username) {
            req.flash('fail', 'Username is already taken')
            return res.redirect('/user/signup')
        }
        Member.findOne({
            where : {
                email: req.body.email
            }
        }).then(email => {
            if(email) {
                req.flash('fail', 'email is already taken')
                return res.redirect('/user/signup')
            }
            next();
        })
    })
}


module.exports = checkDuplicateUserNameOrEmail