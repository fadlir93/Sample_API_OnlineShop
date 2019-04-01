module.exports = (app) => {
    const Transaction = require('../controller/transaction')
    const verifyjwt = require('../validation/verifyJwtToken')
    app.get('/api/transaction', [verifyjwt], Transaction.transaction)
}