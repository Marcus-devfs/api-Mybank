const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {

    try {
        const secret = process.env.NEXT_PUBLIC_SECRET
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, secret)
        req.currentUser = decoded
        next()
    } catch (error) {
        return res.status(401).send({
            message: 'Não autorizado'
        });
    }


}

module.exports = { checkToken }

