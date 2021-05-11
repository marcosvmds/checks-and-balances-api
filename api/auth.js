const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

const authSecret = 'osrblhh'

module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validators

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }
  const isMatch = (reqPass, dbPass) => bcrypt.compareSync(reqPass, dbPass)

  const signin = async (req, res) => {
    try {
      existsOrError(req.body.email, 'Insert a valid email')
      existsOrError(req.body.password, 'Insert a valid password')

      const user = await app.db('users')
        .where('email', req.body.email)
        .first()

      existsOrError(user, "Email/Password doesn't match")

      existsOrError(
        isMatch(req.body.password, user.password),
        "Email/Password doesn't match"
      )

      const userId = user.id

      const account = await app.db('accounts')
        .where('userId', userId)
        .first()
      existsOrError(account, "User doesn't have account yet")

      const transactions = await app.api.transaction.localGetTransactions(account.id)

      const secondsNow = Math.floor(Date.now() / 1000)

      const payload = {
        ...account,
        sub: user.email,
        iat: secondsNow,
        exp: secondsNow + 60 * 15
      }

      const token = jwt.encode(payload, authSecret)

      res.status(200).json({
        payload,
        token,
        transactions
      })
    } catch (msg) {
      res.status(400).send(msg)
    }
  }

  const tokenSignin = async (req, res) => {
    console.log('TOKEN VALIDATING')

    const userToken = req.body.token
    const userPayload = req.body.payload
    const userSub = userPayload.sub
    const accountId = userPayload.id

    try {
      const decodedToken = jwt.decode(userToken, authSecret)

      console.log(decodedToken.sub, userSub)

      equalsOrError(decodedToken.sub, userSub, 'Token de outro usuário')

      const transactions = await app.api.transaction.localGetTransactions(accountId)

      res.status(200).json({
        transactions, token: userToken, payload: userPayload
      })
    } catch (msg) {
      console.log(msg)
      res.status(500).send(msg)
    }
  }

  const register = async (req, res) => {
    const newUser = {
      email: req.body.email,
      name: req.body.name,
      password: encryptPassword(req.body.password)
    }

    try {
      existsOrError(req.body.email, 'Invalid email')
      existsOrError(req.body.name, 'Invalid name')
      existsOrError(req.body.password, 'Invalid password')
      equalsOrError(
        req.body.password, req.body.passwordConfirm,
        "Password doesn't match to confirmation"
      )
      notExistsOrError(
        await app.db('users').where('email', req.body.email),
        'Email already registered'
      )
      app.db('users')
        .insert(newUser)
        .then(_ => res.send('User registered').status(204))
        .catch(err => res.status(500).send(err))
    } catch (msg) {
      return res.status(400).send(msg)
    }
  }
  return { signin, register, tokenSignin }
}
