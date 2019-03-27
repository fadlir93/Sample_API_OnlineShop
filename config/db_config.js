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

module.exports = db;