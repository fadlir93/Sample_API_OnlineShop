module.exports = (app) => {
    const Product = require('../controller/product')
    app.post('/api/product/create', Product.create)
}