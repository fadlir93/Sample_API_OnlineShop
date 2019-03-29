const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())

const db = require('./config/db_config')
db.sequelize.sync({force:true}).then(() => {
    console.log('Table success created')
})

require('./routes/Product')(app)
require('./routes/Member')(app)
require('./routes/Cart')(app)

module.exports = app;