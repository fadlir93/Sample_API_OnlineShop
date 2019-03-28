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

exports.addStock = (req, res) => {
    Product.findByPk(req.params.productId)
    .then(product => {
        Product.update({stock: (req.body.stock + product.dataValues.stock)}, {
            where: {id: req.params.productId}
        }).then(result => {
            console.log(result)
            res.send("berhasil merubah data")
        })
    })
}

