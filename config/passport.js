var bcrypt = require('bcryptjs')
module.exports = function(passport, member) {
    let Member = member;
    var LocalStrategy = require('passport-local').Strategy
    
    passport.serializeUser(function(member, done) {
        done(null, member.id);
    });


    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Member.findByPk(id).then(function(member) {
        if(member){
            done(null, member.get());
        }
        else{
            done(member.errors,null);
        }
        });

    });

    passport.use('local-signup', new LocalStrategy (
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done){
            var generateHash = function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
            };

            Member.findOne({
                where : {
                    username : req.body.username
                }
            }).then(user => {
                if(user){
                    return done(null, false, req.flash('message', 'Username already taken'))
                } else {
                    Member.findOne({
                        where : {
                            email : req.body.email
                        }
                    }).then(email => {
                        if(email){
                            return done(null, false, req.flash('message', 'Email already taken'))
                        }else {
                            var userPassword = generateHash(password)
                            var data = {
                                username : username,
                                password: userPassword,
                                email : req.body.email,
                                fullname : req.body.fullname,
                                address : req.body.address,
                                phone : req.body.phone,
                                gender : req.body.gender,
                                birthdate : req.body.birthdate,
                            }
                            Member.create(data).then((newUser, created) => {
                                if(!newUser){
                                    return done(null,false)
                                }
                                if(newUser){
                                    return done(null, newUser);
                                }
                            })
                        }
                    })
                }
            })
        }
    ))

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            var isValidPassword = function(userpass, password) {
                return bcrypt.compareSync(password, userpass);
            }
            Member.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if (!user) {
     
                    return done(null, false, req.flash('message',"Incorrect Username"));
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, req.flash('message',"Incorrect Password"));
                }
                var userinfo = user.get();
                req.userId = userinfo.id
                console.log(req.userId)
                done(null, userinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));
}

