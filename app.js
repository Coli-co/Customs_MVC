const express = require('express')
const app = express()
const {customer} = require('./data')

app.get('/', (req, res) => {
  console.log("user hit the server")
  res.status(200).send('Home Page')
})


app.get('/customer', (req, res) => {
  // res.status(200).send('Customer Page')
  res.json(customer)
})


app.all('*', (req, res) => {
  res.status(404).send('<h1>Page not found</h1>')
})


app.listen(5000, () => {
  console.log('server is listening on port 5000...')
})