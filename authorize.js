const authorize = (req, res, next) => {
  const {user} = req.query
  if(user === 'Timothy') {
    req.user = {name: 'Timothy', id:0}
    next()
  }
  else{
    res.status(401).send('Unauthorized')
  }
}


module.exports = authorize