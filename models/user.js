const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  }
})

module.exports = userSchema
