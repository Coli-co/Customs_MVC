let {customers} = require('../data')



const getCustomer = (req, res) => {
  const newCustomer = customers.map((data) => {
    const {customer_id, first_name, last_name, birth_date, address, city, state, points} = data;
    return {customer_id, first_name, last_name, birth_date, address, city, state, points}
  })
  return res.status(200).json({ success: true, data: newCustomer})
}


const createCustomer = (req, res) => {

  if(!req.body || {}) {  
    return res.status(400).json({ success: false, msg: 'please provide object value'})
  }


  const newData = customers.push(req.body)
  console.log(newData)
  console.log("customers is:")
  console.log(customers)

  return res.status(201).send({success:true, data:customers})
}



const  getCustomerID = (req, res) => {
  console.log(req.params)
  const {customerID} = req.params
  const singleCustomers = customers.find(
    (customer) => customer.customer_id === Number(customerID)
  )
  if(!singleCustomers) {
    res.status(404).send('Customer ID doesn\'t exist')
}

  res.json(singleCustomers)

}



const updateCustomer = (req, res) => {
  const { customerID } = req.params
  const { name } = req.body
 
  const person = customers.find((customer) => customer.customer_id == Number(customerID))

  if(!person){
    return res.status(400).json({success:false, msg: `no person with id ${customerID}`})
    }

  const newPeople = customers.map((customer) => {
    if (customer.customer_id === Number(customerID)) {
      const queryKey = Object.keys(req.body)
      const queryValue = Object.values(req.body)
      queryKey.forEach((item, index) => {
        customer[item] = queryValue[index]
      })
    }
    return customer
  })

  return res.status(200).json({ success:true, data: newPeople})
  
}


const deleteCustomer = (req, res) => {
  const person = customers.find((customer) => customer.customer_id === Number(req.params.customerID))

  if (!person) {
    return res.status(400).json({ success:false, msg:`no person with id ${req.params.customerID}`})
  }

  const newPeople = customers.filter(
    (customer) => customer.customer_id != Number(req.params.customerID)
  )
  return res.status(200).json({success: true, data: newPeople})

}



const queryCustomer = (req, res) => {
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

}


module.exports = {
  getCustomer,
  createCustomer,
  getCustomerID,
  updateCustomer,
  deleteCustomer,
  queryCustomer
}