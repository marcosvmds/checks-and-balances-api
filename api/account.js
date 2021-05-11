module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError, positiveOrError } = app.api.validators

  const save = (req, res) => {
    const account = { ...req.body }
    app.db('accounts')
      .insert(account)
      .then(_ => res.status(204).send('account saved'))
      .catch(err => res.status(500).send(err))
  }

  const balanceConsolidation = async (transactionData) => {
    try {
      const accountBalance = await app.db('accounts')
        .where('id', transactionData.accountId)
        .first()
        .then(accData => Number(accData.balance))

      const newBalance = transactionData.amount + accountBalance

      if (positiveOrError(newBalance, 'Insuficient balance')) {
        await app.db('accounts') // account.update???
          .where('id', transactionData.accountId)
          .update({ balance: newBalance })
          .then(console.log((`User ${transactionData.accountId} account balance updated`)))
        return true
      } else return false
    } catch (msg) {
      console.log('account catch ' + msg)
    }
  }

  const get = (req, res) => {
    app.db('accounts')
      .then(accounts => res.json(accounts))
      .catch(err => res.status(500).send(err))
  }
  const getById = (req, res) => {
    app.db('accounts')
      .select('balance')
      .where({ id: req.params.id })
      .first()
      .then(balance => res.json(balance))
      .catch(err => res.status(500).send(err))
  }

  const patch = (req, res) => {
    try {
      const account = app.db('accounts')
        .where('id', req.params.id)

      const newBalance = req.body.amount + account.balance

      positiveOrError(newBalance, 'Insuficient balance')

      app.db('accounts') // account.update???
        .where('id', req.params.id)
        .update({ balance: newBalance })
        .then(_ => res.send('Account balance updated'))
        .catch(err => res.status(500).send(err))
    } catch (msg) {
      res.status(400).send(msg)
    }
  }

  return { save, patch, get, getById, balanceConsolidation }
}
