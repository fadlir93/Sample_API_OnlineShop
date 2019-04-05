let express = require('express')
let router = express.Router();
let Cart = require('../model/Data/Cart')
let db = require('../config/db_config')
let Product = db.product
router.get('/cart', (req, res, next) => {
        res.render('payment/cart')
})

router.get('/add-to-cart/:id', function(req, res, next){
        var productId = req.params.id;
        // var cart = new Cart(req.session.cart? req.session.cart : {});
        let cart = new Cart(req.session.cart? req.session.cart : {})
        Product.findByPk(productId) 
        .then(product => {
                cart.add(product, product.id);
                req.session.cart = cart
                res.redirect('/')
        }).catch(err => {
                res.redirect('/')
        })     
});

module.exports = router;
