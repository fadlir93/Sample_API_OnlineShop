const Sequelize = require('sequelize')
const sequelize = new Sequelize("onlineshop","root","", {
    host: '127.0.0.1',
    dialect: 'mysql',
})

sequelize.authenticate()
    .then(() => {
        console.log('connected to DB')
        
    }).catch((err) => {
        console.log(err);
    })


const db = {}
    //config DB Sequelize
    db.Sequelize = Sequelize
    db.sequelize = sequelize

    //models Table
    db.member = require('../model/Member')(sequelize,Sequelize)
    db.product = require('../model/Product')(sequelize, Sequelize)
    db.rating = require('../model/Rating')(sequelize,Sequelize)
    db.comment = require('../model/Comment')(sequelize,Sequelize)
    db.cart = require('../model/Cart')(sequelize,Sequelize)
    db.transaction = require('../model/Transaction')(sequelize, Sequelize)

    // relation
    db.cart.belongsTo(db.member);
    db.cart.belongsTo(db.product);
    db.member.hasMany(db.cart);
    db.product.hasMany(db.cart);
    db.transaction.belongsTo(db.cart);
    db.cart.hasMany(db.transaction);
    

module.exports = db;