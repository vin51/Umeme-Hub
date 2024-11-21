//dependancies
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '../.env')})

//NREL API config
const nrelConfig = {
    apiKey: process.env.NREL_API_KEY,
    baseUrl: process.env.NREL_BASE_URL
}

module.exports = nrelConfig