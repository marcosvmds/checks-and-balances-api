const dotenv = require('dotenv')
dotenv.config()
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

consign().
    include('./config/passport.js').
    then('./config/middlewares.js').
    then('./api/validators.js').
    then('./api').
    then('./config/routes.js').
    into(app)

app.listen(process.env.PORT || 3001, () =>{
    console.log(`Backend rodando na porta ${process.env.PORT}...`)
    console.log(`URL do banco ${process.env.DATABASE_URL}`)
})