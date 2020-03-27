const jwt = require('express-jwt');
const { secret } = require('../config/jwt');

function getTokenFromCookie(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
}

module.exports = {
  required: jwt({
    secret,
    userProperty: 'user',
    getToken: getTokenFromCookie
  })
};
