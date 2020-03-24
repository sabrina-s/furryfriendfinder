require('dotenv').config({ path: '../.env' });

function getJWTSigningSecret() {
  const secret = process.env.JWT_TOKEN;
  if (!secret) {
    throw new Error('Missing secrets to sign JWT token');
  }
  return secret;
}

module.exports = {
  secret: getJWTSigningSecret()
};
