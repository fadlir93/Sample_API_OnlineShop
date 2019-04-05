module.exports = (app) => {
    const Member = require('../../controller/API/member')
    const validationUsernameAndEmail = require('../../validation/verifySignup')
    app.post('/api/member/signup', [validationUsernameAndEmail], Member.signup)
    app.post('/api/member/signin', Member.signin)
    
}