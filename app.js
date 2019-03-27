const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const db = require('./config/db_config')
db.sequelize.sync().then(() => {
    console.log('Table success created')
})

module.exports = app;