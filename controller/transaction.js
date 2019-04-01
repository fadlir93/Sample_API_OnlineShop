const db = require('../config/db_config')
const Transaction = db.transaction
const Member = db.member
const Cart = db.cart
const Product = db.product
const midtransClient = require('midtrans-client')
require('dotenv').config();

let core = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : process.env.serverKey,
    clientKey : process.env.clientKey
  });



exports.paymentIndomaret = (req, res) => {
    Cart.findAll({
        where : {
            memberId : req.userId
        },
        include : [
            {
                model: Product,
                attributes: ['productName', 'productType','price']
            }
        ]
    }).then(cart => {
        details = []
        total = 0;
        for(let i = 0; i < cart.length; i++){
            details.push(
                {
                    id : cart[i].id,
                    price: cart[i].product.price,
                    quantity: cart[i].quantity,
                    name: cart[i].product.productName
                }
            )
            total += (cart[i].product.price * cart[i].quantity)
        }
        Member.findAll({
            where : {
                id : req.userId
            }
        }).then(member => {
            core.charge({
                "payment_type": "cstore",
                "transaction_details": {
                    "gross_amount": total,
                    "order_id": Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase()
                },
                "cstore": {
                    "store": "Indomaret",
                    "message": "Tiket1 transaction"
                },
                "customer_details": {
                    "first_name": member[0].username,
                    // "last_name": "Utomo",
                    "email": member[0].email,
                    "phone": member[0].phone
                },
                "item_details": details
            }).then(resultIndomaret => {
                res.json(resultIndomaret)
            })
        })
    })
}