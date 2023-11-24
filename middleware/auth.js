const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

module.exports = (req,res,next) => {
  const {authorization} = req.headers;

  if(!authorization || !authorization.startsWith('Bearer')) {
    return next (ApiError.unauthorized("User is unauthorized"));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'very-secret-key');
  } catch(err) {
    return next(ApiError.unauthorized("User is unauthorized"));
  }

  req.user = payload;

  return next();
}