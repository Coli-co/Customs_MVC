const express = require('express')
const router = express.Router()


const {
  getCustomer,
  createCustomer,
  createCustomerPostman,
  getCustomerID,
  updateCustomer,
  deleteCustomer,
  queryCustomer
} = require('../controllers/customer')


router.get('/', getCustomer)
router.post('/', createCustomer)
router.get('/:customerID', getCustomerID)
router.put('/:customerID', updateCustomer)
router.delete('/:customerID', deleteCustomer)
router.get('/data/query', queryCustomer)


module.exports = router