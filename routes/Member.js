module.exports = (app) => {
    const Member = require('../controller/member')
    const validationUsernameAndEmail = require('../validation/verifySignup')
    app.post('/api/member/create', [validationUsernameAndEmail], Member.signup)
}