module.exports = {
  url: process.env.MONGO_DATABASE_URL || 'mongodb://localhost/test',

  connectionParams: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
}
