const db = require('../config/db_config')
const Product = db.product
const Cart = db.cart
const Member = db.member
exports.addItem = (req, res) => {
    Member.findOne({
      where: {id: req.userId}
    }).then(() => {
        Cart.create({
          quantity: req.body.quantity,
          memberId: req.userId,
          productId: req.body.productId
        })
        .then(() => {
          res.send("Item Success added to cart")
        })
      .catch(err => {
          res.send(err)
      })
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access User Page",
        "error": err
      });
    })
}

// exports.addItem = (req, res) => {
//   Cart.create({
//     quantity: req.body.quantity,
//     memberId: req.body.memberId,
//     productId: req.body.productId
//   }).then(() => {
//     res.send("data berhasil dibuat")
//   }).catch(err => {
//     res.send(err)
//   })
// }



