const express = require('express');
const bodyParser = require('body-parser');
const fse = require('fs-extra');
let expressHbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const app = express();
const session = require('express-session')


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())

app.use(session({
    secret: 'zzzz', 
    cookie: { maxAge: 60000 },
    resave: false,    // forces the session to be saved back to the store
    saveUninitialized: false  // dont save unmodified
  }));
app.use(flash())

let indexRouter = require('./routes/Index')
let userRouter = require('./routes/User')
// let userRouter = require('./routes/User')
// const db = require('./config/db_config')
// db.sequelize.sync().then(() => {
//     console.log('Table success created')
// })

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', indexRouter)
app.use('/user', userRouter)

require('./routes/API/Product')(app)
require('./routes/API/Member')(app)
require('./routes/API/Cart')(app)
require('./routes/API/Transaction')(app)


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