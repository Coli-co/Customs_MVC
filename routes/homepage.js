const express = require('express')
const router = express.Router()
const homePage = require('../controllers/homepage')



router.get('/', homePage)


module.exports = router