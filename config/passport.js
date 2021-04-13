const {authSecret} = require('../.env')
const passport = require('passport')
const passportJwt = require ('passport-jwt')
const {Strategy, ExtractJwt} = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done)=>{
        app.db("accounts")
            .where("id", payload.id)
            .first()
            .then(account => done(
                null, 
                (account ? {...payload} : false), 
                { message: 'Expired session. Signin again.' })
                )
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session: false })
    }
}