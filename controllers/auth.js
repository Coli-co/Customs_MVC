


const auth = (req, res) => {
  const {name} = req.body;
  if(name){
    return res.status(200).send(`Welcome ${name}`)
  }
  return res.status(401).send('Please Provide Name Value')
}


module.exports = auth
