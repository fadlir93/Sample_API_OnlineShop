let express = require('express')
let router = express.Router();
let Cart = require('../model/Data/Cart')
let db = require('../config/db_config')
let Product = db.product


router.get('/add-to-cart/:id', function(req, res, next){
	var productId = req.params.id;
	// var cart = new Cart(req.session.cart? req.session.cart : {});
	let cart = new Cart(req.session.cart? req.session.cart : {})
	Product.findByPk(productId) 
	.then(product => {
		cart.add(product, product.id);
		req.session.cart = cart
		res.redirect('/')
	}).catch(err => {
		res.redirect('/')
	})     
});

router.get('/cart', (req, res, next) => {
	if(!req.session.cart){
		return res.render('payment/cart', {products: null})
	}
		var cart = new Cart(req.session.cart);
		res.render('payment/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice.toLocaleString('de-DE')})
})

router.get('/checkout',isLoggedIn, (req, res, next) => {
		res.render('payment/checkout')
})

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){ 
		return next();
	}
	req.flash('message', 'Silahkan Login Terlebih Dahulu Untuk Bisa Melakukan Proses Berikutnya')
	res.redirect('/user/signin');
}
module.exports = router;
