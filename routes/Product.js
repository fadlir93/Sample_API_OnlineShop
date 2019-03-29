module.exports = (app) => {
    const Product = require('../controller/product')
    
    app.post('/api/product/create', Product.create)
    app.put('/api/product/addStock/:productId', Product.addStock)
    app.get('/api/products', Product.findAll)
    // app.get(`/api/product/slug/:description`, Product.findBySlug)
}