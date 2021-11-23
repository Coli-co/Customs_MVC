const express = require('express')
const app = express()
const morgan = require('morgan')
const {customers} = require('./data')
const logger = require('./logger')
const authorize = require('./authorize')
// req => middleware => res
// app.use(logger)
// app.use('/customers', authorize)
app.use(morgan('tiny'))

//static assets
app.use(express.static('./methods-public'))
//parse from data
app.use(express.urlencoded({extended: false}))
//parse json
app.use(express.json())


app.get('/', (req, res) => {
  console.log(req.user)
  console.log('Logger is authorized !')
  console.log("user hit the server")
  res.send('<h1>Home Page</h1><a href = "/customers">Customers Data</a>')
})


app.get('/customers', (req, res) => {
  const newCustomer = customers.map((data) => {
    const {customer_id, first_name, last_name, birth_date, address, city, state} = data;
    return {customer_id, first_name, last_name, birth_date, address, city, state}
  })
  return res.status(200).json({ success: true, data: newCustomer})
})


app.post('/customers', (req, res) => {
  const {name} = req.body
  if(!name) {  
    return res.status(400).json({ success: false, msg: 'please provide name value'})
  }
  return res.status(201).send({success:true, person:name})
})



app.post('/customers/postman', (req, res) => {
  const {name} = req.body
  if(!name) {
    return res.status(400).json({ success:false, msg:'please provide name value'})
  }
  return res.status(201).send({success:true, data:[...customers, name]})
})



app.post('/login', (req, res) => {
  const {name} = req.body;
  if(name){
    return res.status(200).send(`Welcome ${name}`)
  }
  return res.status(401).send('Please Provide Name Value')
})


app.get('/customers/:customerID', (req, res) => {
  console.log(req.params)
  const {customerID} = req.params
  const singleCustomers = customers.find(
    (customer) => customer.customer_id === Number(customerID)
  )
  if(!singleCustomers) {
    res.status(404).send('Customer ID doesn\'t exist')
}

  res.json(singleCustomers)

})

app.put('/customers/:customerID', (req, res) => {
  const { customerID } = req.params
  const { name } = req.body
  const person = customers.find((customer) => customer.customer_id == Number(customerID))

  if(!person){
    return res.status(400).json({success:false, msg: `no person with id ${customerID}`})
    }

  const newPeople = customers.map((customer) => {
    if (customer.customer_id === Number(customerID)) {
      customer.first_name = name
    }
    return customer
  })

  return res.status(200).json({ success:true, data: newPeople})
  
})


app.delete('/customers/:customerID', (req, res) => {
  const person = customers.find((customer) => customer.customer_id === Number(req.params.customerID))

  if (!person) {
    return res.status(400).json({ success:false, msg:`no person with id ${req.params.customerID}`})
  }

  const newPeople = customers.filter(
    (customer) => customer.customer_id != Number(req.params.customerID)
  )
  return res.status(200).json({success: true, data: newPeople})

})




app.get('/customers/data/query', (req, res) => {
  const { search, limit, field } = req.query
  console.log(req.query)

  let searchCustomers = [...customers]
  
  if(search) {
      searchCustomers = searchCustomers.filter((data) => { 
        const value = data[field]
        if (typeof value == "number") { 
          // const int_data = keyWord.toString() 
          return value == Number(search)
        }    
      return value.startsWith(search)
      })
  } 
 

  if (searchCustomers.length < 1) {
    // return res.status(200).send('No customer data match your result.')
    return res.status(200).json({ success: true, data: []})
  }


  if (limit) {
    searchCustomers = searchCustomers.slice(0, Number(limit))
  }
  return res.json(searchCustomers)

})






// app.all('*', (req, res) => {
//   res.status(404).send('<h1>Page not found</h1>')
// })


app.listen(5000, () => {
  console.log('server is listening on port 5000...')
})