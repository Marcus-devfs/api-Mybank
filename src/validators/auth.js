const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {

    try {
        const token = req.headers.Authorization.split('')[1]
        const decoded = jwt.verify(token, process.env.SECRET)
        req.currentUser = decoded
        next()
    } catch (error) {

        console.error(error.data);
        return res.status(401, { 
            msg: 'Token inválido!' 
        });
    }

}

module.exports = {checkToken}

