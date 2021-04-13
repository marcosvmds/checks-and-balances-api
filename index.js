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

app.listen(3001, () =>{
    console.log("Backend rodando na porta 3001...")
})