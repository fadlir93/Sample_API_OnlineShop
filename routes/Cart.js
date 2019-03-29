module.exports = (app) => {
    const Cart = require('../controller/cart')
    const verifyjwt = require('../validation/verifyJwtToken')
    app.post('/api/cart/additem', [verifyjwt], Cart.addItem)
}