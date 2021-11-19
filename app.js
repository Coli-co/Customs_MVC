const express = require('express')
const app = express()
const {customers} = require('./data')
const logger = require('./logger')
const authorize = require('./authorize')
// req => middleware => res
app.use([logger, authorize])



app.get('/', (req, res) => {
  
  console.log("user hit the server")
  res.send('<h1>Home Page</h1><a href = "/customers">Customers Data</a>')
})


app.get('/customers', (req, res) => {
  console.log(req.user)
  console.log('Logger is authorized !')
  const newCustomer = customers.map((data) => {
    const {customer_id, first_name, last_name, birth_date, address, city, state} = data;
    return {customer_id, first_name, last_name, birth_date, address, city, state}
  })
  return res.json(newCustomer)
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