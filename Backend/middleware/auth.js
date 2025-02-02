const jwt = require("jsonwebtoken");
const secretKey= "123456789"

function auth(req, res, next) {
const {authorization} = req.headers;

if (!authorization || !authorization.startsWith('Bearer ')) {
  return res.status(403).send({ message: 'Prohibido: Token inválido' });
}

const token = authorization.replace('Bearer ', '');
let payload;

try {
  payload = jwt.verify(token, secretKey);
  console.log("payload",payload);
}
catch (err) {
  return res.status(403).send({ message: 'Prohibido: Token inválido' });
}

req.user = payload;
next();
}

module.exports = {auth}