module.exports = app => {

    const save = (req, res) => {
        const transaction = {...req.body}
        app.db('transactions')
            .insert(transaction)
            .then(_ => res.status(204).send("transação cadastrada"))
            .catch(err => res.status(500).send(err))
    }
    const get = (req, res) => {
        app.db('transactions')
            .then(transactions => res.json(transactions))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('transactions')
            .where('accountId', req.params.accountId)
            .then(transactions => res.json(transactions))
            .catch(err => res.status(500).send(err))
    }

    return {save, get, getById}
}