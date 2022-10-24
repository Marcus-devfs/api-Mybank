const { readdirSync } = require('fs')
const { join } = require('path')

const setupRoutes = async (app) => {
    
    readdirSync(join(__dirname, './')).filter(file => file != 'index.js').map(async file => {
        const routes = require(`./${file}`)
        app.use(routes)
    })
}

module.exports = setupRoutes;