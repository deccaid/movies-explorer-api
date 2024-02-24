const jwt = require('jsonwebtoken');

const UnAutorizedError = require('../errors/UnAutorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAutorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    const jwtSecretWord = process.env.NODE_ENV !== 'production' ? 'not-secret-key' : process.env.JWT_SECRET;
    payload = jwt.verify(token, jwtSecretWord);
  } catch (err) {
    throw new UnAutorizedError('Неверный токен');
  }
  req.user = payload;
  return next();
};
