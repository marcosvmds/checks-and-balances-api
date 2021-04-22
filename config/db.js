const enviroment = process.env.DB_ENV || 'development'
const config = require('../knexfile.js')[enviroment]
const knex = require('knex')(config)

console.log("chega aqui? ")
console.log(process.env.DATABASE_URL)
knex.migrate.latest([config])
module.exports = knex