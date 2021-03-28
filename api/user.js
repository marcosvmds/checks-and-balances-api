module.exports = app => {

    const save = (req, res) => {
        const user = {...req.body}
        app.db('users')
            .insert(user)
            .then(_ => res.status(204).send("usuário cadastrado"))
            .catch(err => res.status(500).send(err))
    }
    return {save}
}