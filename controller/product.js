const db = require('../config/db_config')
const Product = db.product

exports.create = (req, res) => {
    Product.create({
        productName: req.body.productName,
        productType: req.body.productType,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price
    }).then(result => {
        res.send(result)
    })
}