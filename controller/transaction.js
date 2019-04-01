const db = require('../config/db_config')
const Transaction = db.transaction
const Cart = db.cart
const Product = db.product

exports.transaction = (req, res) => {
    Cart.findAll({
        where : {
            memberId : req.userId
        },
        include : [
            {
                model: Product,
                attributes : ['productName','productType','price']
            }
        ]
    }).then(result => {
        total = 0;
        for(let i = 0; i < result.length; i++){
            total += (result[i].product.price * result[i].quantity)
        }
        console.log(total)
        transaction.create({
            total : total,
            approvalStatus : true,
            memberId : req.userId,
        })
        res.json(result)
    })
}