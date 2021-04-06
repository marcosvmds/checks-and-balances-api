
module.exports = app =>{

    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validators

    const signin = async (req, res) => {
        console.log(req.body)
        try {
            const user = await app.db('users')
                .where('email', req.body.email)
                .where('password', req.body.password)
                .first()
                .then(res.status(200))
                .catch(err => res.status(500).send(err))
            existsOrError(user, "Email/Password doesn't match")

            const userId = user.id

            const account = await app.db('accounts')
                .where('userId', userId)
                .first()
                .then(res.status(200))
                .catch(err => res.status(500).send(err))
            existsOrError(account, "User doesn't have account yet")

            res.status(200).json(account)
        } 
        catch(msg){
            res.status(400).send(msg)
        } 
    }

    const register = async (req, res) => {
        try{
            existsOrError(req.body.email, "Invalid email")
            existsOrError(req.body.name, "Invalid name")
            existsOrError(req.body.password, "Invalid password")
            equalsOrError(
                req.body.password, req.body.passwordConfirm, 
                "Password doesn't match to confirmation"
            )
            notExistsOrError(
                await app.db('users').where("email", req.body.email), 
                "Email already registered"
            )              
            const newUser = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            }
            app.db('users')
                .insert(newUser)
                .then(_ =>{
                    res.status(204),
                    res.status(500)
                })

            res.status(204).send("User registered")     
        } 
        catch(msg){
            res.status(400).send(msg)
        }

    }
    return {signin, register}
}
