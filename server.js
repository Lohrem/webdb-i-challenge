const express = require('express')
const db = require('./data/dbConfig.js')
const server = express()
const AccountsRouter = require('./data/seeds/accountsRouter')

server.use(express.json())
server.use('/api/accounts', AccountsRouter)
server.use(db)

server.get('/', (req, res) => {
  res.send("yeehaw")
})

module.exports = server