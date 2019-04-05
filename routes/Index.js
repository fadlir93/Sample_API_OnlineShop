let express = require('express')
let router = express.Router();
const db = require('../config/db_config')
const Product = db.product

router.get('/', (req, res, next) => {
    Product.findAll().then(product => {
        
        res.render('shop/index', {product: product})
    })
})


module.exports = router;
