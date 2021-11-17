const express = require('express')
const app = express()
const {customers} = require('./data')

app.get('/', (req, res) => {
  console.log("user hit the server")
  // res.status(200).send('Home Page')
  res.send('<h1>Home Page</h1><a href = "/customers">Customers Data</a>')
})


app.get('/customers', (req, res) => {
  const newCustomer = customers.map((data) => {
    const {customer_id, first_name, last_name, birth_date, address, city, state} = data;
    return {customer_id, first_name, last_name, birth_date, address, city, state}
  })
  res.json(newCustomer)
})


app.get('/customers/:customerID', (req, res) => {
  console.log(req.params)
  const {customerID} =req.params
  const singleCustomers = customers.find(
    (customer) => customer.customer_id === Number(customerID)
  )
if(!singleCustomers) {
  res.status(404).send('Customer Data Doesn\'t Exist')
}

  res.json(singleCustomers)

})




app.all('*', (req, res) => {
  res.status(404).send('<h1>Page not found</h1>')
})


app.listen(5000, () => {
  console.log('server is listening on port 5000...')
})