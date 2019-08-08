const express = require('express')
const router = express.Router()
const db = require('../dbConfig')

router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts')
    res.status(200).json(accounts)
  } catch (err) {
    res.status(500).json({
      message: "Errors getting table",
      error: err
    })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [account] = await db('accounts').where({ id })
    if (account) {
      res.status(200).json(account)
    } else {
      res.status(404).json({
        message: "Could not find account with that ID"
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "Error getting account",
      err
    })
  }
})

router.post('/', async (req, res) => {
  const accountInfo = req.body
  try {
    const account = await db('accounts').insert(accountInfo)
    res.status(201).json(account)
  } catch (err) {
    res.status(500).json({
      message: "Could not add account",
      err
    })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const updatedAccount = req.body
  try {
    const account = await db('accounts').update(updatedAccount).where({ id })
    if(account) {
      res.status(201).json(account)
    }
    else {
      res.status(404).json({
        message: "Could not find account with that ID"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Error updating account",
      err
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const account = await db('accounts').where({ id }).del()
    if (account) {
      res.status(201).json({
        message: `Account with id: ${id} has been deleted`
      })
    }
    else {
      res.status(404).json({
        message: "Could not find anyone with that id, try again loser"
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "Error deleting the account",
      err
    })
  }
})

module.exports = router