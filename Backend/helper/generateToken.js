const jwt = require("jsonwebtoken");

const secretKey= "123456789"

function generateToken(user) {
  const token = jwt.sign({userId: user._id}, secretKey,
    { expiresIn: '7d'})
  return token
}

module.exports = {generateToken}