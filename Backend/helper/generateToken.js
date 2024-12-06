const jwt = require("jsonwebtoken");

const secretKey= process.env.JWT_SECRET

function generateToken(user) {
  const token = jwt.sign({userId: user._id}, secretKey,
    { expiresIn: '7d'})
  return token
}

module.exports = {generateToken}