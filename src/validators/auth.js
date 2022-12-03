const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {

    try {
        const secret = process.env.SECRET
        const token = req.headers.authorization.split('')[1];
        const decoded = jwt.verify(token, secret)
        req.currentUser = decoded

        
        next()
    } catch (error) {
        console.log(error.data, 'a')
        return res.status(401).send({ 
            msg: 'Token inválido!' 
        });
    }
    

}

module.exports = {checkToken}

