const mongoose = require('mongoose')
const { url, connectionParams } = require('../mongoosefile')
const transactionSchema = require('../models/transaction')

const mongodb = mongoose.connect(url, connectionParams)
  .then((db) => {
    console.log('MongoDB connected')

    const Transactions = mongoose.model('Transactions', transactionSchema)

    return { db, Transactions }
  })
  .catch(err => {
    console.error('MongoDB connection failed ' + err)
  })

module.exports = mongodb
