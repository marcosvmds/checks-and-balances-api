const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const save = (req, res) => {
        const user = {
            ...req.body, 
            password: encryptPassword(user.password)
        }
        app.db('users')
            .insert(user)
            .then(_ => res.status(204).send("usuário cadastrado"))
            .catch(err => res.status(500).send(err))
    }
    const get = (req, res) =>{
        app.db('users')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }  

    return {save, get}
}

