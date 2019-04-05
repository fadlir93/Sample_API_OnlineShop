const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            auth: false,
            message: 'No Token Provided.'
        });
    }
    jwt.verify(token,'fadli-ramadhan', (err, decoded) => {
        if(err) {
            return res.status(500).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            })
        }
        req.userId = decoded.id;
        next();
    })
}

module.exports = verifyToken