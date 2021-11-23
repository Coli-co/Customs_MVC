const express = require('express')
const router = express.Router()




router.get('/', (req, res) => {
  console.log(req.user)
  console.log('Logger is authorized !')
  console.log("user hit the server")
  res.send('<h1>Home Page</h1><a href = "/customers">Customers Data</a>')
})


module.exports = router