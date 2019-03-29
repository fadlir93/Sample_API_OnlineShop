const db = require('../config/db_config')
const Product = db.product

exports.create = (req, res) => {
    Product.create({
        productName: req.body.productName,
        productType: req.body.productType,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price
    }).then(result => {
        res.send(result)
    })
}

exports.addStock = (req, res) => {
    Product.findByPk(req.params.productId)
    .then(product => {
        Product.update({stock: (req.body.stock + product.dataValues.stock)}, {
            where: {id: req.params.productId}
        }).then(result => {
            console.log(result)
            res.send("berhasil merubah data")
        })
    })
}

// exports.findBySlug = (req, res) => {
//     url = urlSlug(req.params.description)
//     console.log(url)
//     Product.findOne({
//         where : {
//             description : req.params.description
//         }
//     }).then(result => {
//         res.send(result)
//     })
// }

exports.findAll = (req, res, next) => {

    const page = req.query.page || 1;
    const perPage = (req.query.per_page && parseInt(req.query.per_page)) || 2;

    Product.findAndCountAll({
        limit: perPage,
        offset: (page - 1) * perPage
    })
    .then(({count, rows}) => {
        
        if(rows.length == 0){
            // let error = new Error();
            
            return next({
                message: "Not Found",
                code: 404
            });
        }

        res.json({
            data: rows,
            page,
            count: rows.length,
            total_count: count,
            total_page: Math.ceil(count / perPage),
        })
    })
    .catch((err)=> {
        next(err);
    })

    // resultCount = 0
    // if (req.params.count == 1){
    //     resultCount = 0
    // }else if(req.params.count == 2){
    //     resultCount = 2
    // }else {
    //     resultCount = ((req.params.count - 1) * 2)
    // }
    // Product.findAll({
    //     limit: 2,
    //     offset: (0 + resultCount) 
    // }).then( result => {
    //     res.send(result)
    // })
}
