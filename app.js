const express = require('express');
const bodyParser = require('body-parser');
const fse = require('fs-extra');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())

const db = require('./config/db_config')
db.sequelize.sync().then(() => {
    console.log('Table success created')
})



require('./routes/Product')(app)
require('./routes/Member')(app)
require('./routes/Cart')(app)
require('./routes/Transaction')(app)


app.use((error,req, res, next) => {
    fse.outputFile('./logs/error.log', 
    
        `${new Date()} - ${req.url} ${error.message} \n`,
        {
            flag: 'a'
        }
    )
    const code = error.code || 500;
    res.status(code);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;