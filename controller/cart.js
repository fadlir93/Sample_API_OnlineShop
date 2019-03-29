const db = require('../config/db_config')
const Product = db.product
const Cart = db.cart
const Member = db.member
exports.addItem = (req, res) => {
    Member.findOne({
      where: {id: req.userId}
    }).then(user => {
        console.log(user)
      Product.findAll()(products => {
          console.log(products)
        //   user.setProducts(products)
          .then(() => {
              res.send(products)
          })
          .catch(err => {
              res.send(err)
          })
      })
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access User Page",
        "error": err
      });
    })
}



