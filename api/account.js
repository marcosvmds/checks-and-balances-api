module.exports = app => {

    const save = (req, res) => {
        const account = {...req.body}
        app.db('accounts')
            .insert(account)
            .then(_ => res.status(204).send("account saved"))
            .catch(err => res.status(500).send(err))
    }
    const patch = (req, res) =>{
        app.db('accounts')
            .where('id', req.params.id)
            .update({balance: req.body.balance})
            .then(_ => res.status(204).send("Account balance updated"))
            .catch(err => res.status(500).send(err))
    }
    const get = (req, res) => {
        app.db('accounts')
            .then(accounts => res.json(accounts))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('accounts')
            .select('balance')
            .where({id: req.params.id})
            .first()
            .then(balance => res.json(balance))
            .catch(err => res.status(500).send(err))
    }

    return {save, patch, get, getById}

}