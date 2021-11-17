const express = require('express')
const app = express()


app.get('/', (req, res) => {
  console.log("user hit the server")
  res.send('Custom Page')
})


app.listen(5000, () => {
  console.log('server is listening on port 5000...')
})