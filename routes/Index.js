let express = require('express')
let router = express.Router();

router.get('/', (req, res, next) => {
    res.render('shop/index', {title: 'Shoping Cart'})
})


module.exports = router;
