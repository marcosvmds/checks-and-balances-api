module.exports = app => {
  const save = async (req, res) => {
    try {
      const transaction = { ...req.body }
      const mongo = await app.mdb
      const trans = new mongo.Transactions(transaction)

      trans.save(err => {
        if (err) throw new Error(err)
        console.log('Saved transaction at noSQL DB')
      })
      if (await app.api.account.balanceConsolidation(transaction)) {
        app.db('transactions')
          .insert(transaction)
          .then(_ => res.status(204).send('Transaction done'))
          .catch(err => {
            res.status(500).send(err)
          })
      } else throw new Error('Insuficient balance')
    } catch (msg) {
      console.log(msg)
      res.status(400).send(msg)
    }
  }

  const get = (req, res) => {
    app.db('transactions')
      .then(transactions => res.json(transactions))
      .catch(err => res.status(500).send(err))
  }

  const getMongo = async (req, res) => {
    const mongo = await app.mdb
    try {
      mongo.Transactions.find((err, transactions) => {
        if (err) throw new Error(err)
        return res.status(200).json(transactions)
      })
    } catch (err) {
      res.status(400).send(err)
    }
  }

  const getById = (req, res) => {
    app.db('transactions')
      .where('accountId', req.params.accountId)
      .then(transactions => res.json(transactions))
      .catch(err => res.status(500).send(err))
  }

  const localGetTransactions = (accountId) => {
    return app.db('transactions')
      .where('accountId', accountId)
  }

  return { save, get, getById, getMongo, localGetTransactions }
}
