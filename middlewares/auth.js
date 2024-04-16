// const jwt = require('jsonwebtoken');

// const UnAutorizedError = require('../errors/UnAutorizedError');

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new UnAutorizedError('Необходима авторизация');
//   }
//   const token = authorization.replace('Bearer ', '');
//   let payload;
//   try {
//     const jwtSecretWord =
// process.env.NODE_ENV !== 'production' ? 'not-secret-key' : process.env.JWT_SECRET;
//     payload = jwt.verify(token, jwtSecretWord);
//   } catch (err) {
//     throw new UnAutorizedError('Неверный токен');
//   }
//   req.user = payload;
//   return next();
// };
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnAutorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
// const jwt = require('jsonwebtoken');

// const JWT_SECRET = 'supersecretkey';
// const UnAutorizedError = require('../errors/UnAutorizedError');

// const auth = (req, res, next) => {
// const token = req.cookies.jwt ||
//  (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));
//   if (!token) {
//     return next(new UnAutorizedError({
//  code: 400, message: 'Токен аутентификации отсутствует' }));
//   }
//   let payload;
//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     return next
// (new UnAutorizedError({ code: 401, message: 'Недействительный токен аутентификации' }));
//   }
//   req.user = payload;
//   return next();
// };

// module.exports = auth;
