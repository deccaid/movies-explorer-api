const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://decaid.diplom.nomoredomainswork.ru',
  'https://decaid.diplom.nomoredomainswork.ru',
  'https://api.nomoreparties.co',
  'http://forestofrest.nomoredomainswork.ru/signup',
  'https://forestofrest.nomoredomainswork.ru/signup',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', 30);
    return res.end();
  }

  return next();
};
