const express = require('express')
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const cors = require('cors')
require('dotenv').config()
const shortId = require('shortid')
let mocks = require('./mocks')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true
})

app.post('/employee', (req, res) => {
  // simulate actual db save with id and createdAt added
  const employee = {
    id: shortId.generate(),
    createdAt: new Date().toISOString(),
    ...req.body
  }
  mocks.push(employee) // like our db
  // trigger this update to our pushers listeners
  pusher.trigger('employee', 'new', employee)
  res.send(employee)
})

app.delete('/employee/:id', (req, res) => {
  const employee = mocks.find(emp => emp.id === req.params.id)
  mocks = mocks.filter(emp => emp.id !== employee.id)
  pusher.trigger('employee', 'deleted', employee)
  res.send(employee)
})

app.get('/employee', (req, res) => {
  res.send(mocks)
})

app.listen(process.env.PORT || 3000, () => console.log('Listening at 3000'))
