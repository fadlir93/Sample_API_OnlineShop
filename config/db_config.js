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
    db.member = require('../model/member')(sequelize,Sequelize)
    db.product = require('../model/product')(sequelize, Sequelize)
    db.rating = require('../model/rating')(sequelize,Sequelize)

    //relation
    db.member.belongsToMany(db.product, {through: 'rating', foreignKey: 'productId', otherKey: 'memberId'})
    db.product.belongsToMany(db.member, {through: 'rating', foreignKey: 'memberId', otherKey:'productId'})

module.exports = db;