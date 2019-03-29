module.exports = (app) => {
    const Cart = require('../controller/cart')
    const verifyjwt = require('../validation/verifyJwtToken')
    app.post('/api/cart/additem', [verifyjwt], Cart.addItem)
    app.get('/api/cart/listitems', [verifyjwt], Cart.listItem)
    app.delete('/api/cart/listitem/delete', [verifyjwt], Cart.deleteItem )
}