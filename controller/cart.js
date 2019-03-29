const db = require('../config/db_config')
const Product = db.product
const Cart = db.cart
exports.addItem = (req, res) => {
  Cart.create({
    quantity: req.body.quantity,
    memberId: req.userId,
    productId: req.body.productId
  }).then(() => {
      res.send("Item Success added to cart")
  }).catch(err => {
      res.send(err)
  })
}

exports.listItem = (req, res) => {
  Cart.findAll({
    where : {
      memberId : req.userId
    },
    attributes : [],
    include : [{
        model : db.product
    }]
  }).then((list) => {
    res.send(list)      
  }).catch(err => {
    res.send(err)
  })
}

exports.deleteItem = (req, res) => {
  Cart.destroy({
    where : {
      productId : req.body.productId,
      memberId : req.userId
    }
  }).then(() => {
    res.send("Item Success Deleted")
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



