const enviroment = process.env.DB_ENV || 'development'
const config = require('../knexfile.js')[enviroment]
const knex = require('knex')(config)

knex.migrate.latest([config])
module.exports = knex