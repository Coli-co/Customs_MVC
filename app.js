const express = require('express')
const app = express()
const morgan = require('morgan')

const homepage = require('./routes/homepage')
const customer = require('./routes/customer')
const auth = require('./routes/auth')

app.use(morgan('tiny'))

//static assets
app.use(express.static('./methods-public'))
//parse from data
app.use(express.urlencoded({extended: false}))
//parse json
app.use(express.json())


app.use('/', homepage)
app.use('/customers', customer)
app.use('/login', auth)




app.listen(5000, () => {
  console.log('server is listening on port 5000...')
})