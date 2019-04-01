module.exports = (app) => {
    const Transaction = require('../controller/transaction')
    const verifyjwt = require('../validation/verifyJwtToken')
    app.get('/api/transaction/paymentIndomaret', [verifyjwt], Transaction.paymentIndomaret)
    app.post('/api/transaction/paymentStatus', [verifyjwt], Transaction.statusPayment)
}