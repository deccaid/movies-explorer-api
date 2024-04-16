require('dotenv').config();

const {
  PORT = '3000',
  LOCALHOST = 'http://localhost:3000',
  DBADDRES = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  resSuccess: {
    createdUser: { code: 201 },
    readUser: { code: 200 },
    readMovies: { code: 200 },
    movieDeleted: { code: 200, message: 'Фильм успешно удален' },
    userSignedIn: { code: 200, message: 'Вы успешно вошли' },
    userSignedOut: { code: 200, message: 'Вы успешно вышли' },
    movieCreated: { code: 201 },
    profilePatched: { code: 201 },
    corsSuccess: { code: 200 },
    rateLimitMessage: 'Превышен лимит запросов. Пожалуйста, повторите позже.',
  },
  resError: {
    serverError: { code: 500, message: 'Ошибка сервера' },
    validationError: { code: 400, message: 'Переданы некорректные данные' },
    movieNotFound: { code: 404, message: 'Фильм не найден' },
    notMovieOwner: { code: 403, message: 'Вы не владелец фильма' },
    invalidMovieDeletion: { code: 400, message: 'Переданы некорректные данные для удаления фильма' },
    emptyData: { code: 400, message: 'Почта или пароль отсутствуют' },
    unauthorizedUserData: { code: 401, message: 'Неправильная почта или пароль' },
    conflictUserError: { code: 409, message: 'Пользователь с таким E-mail уже создан' },
    conflictMovieError: { code: 409, message: 'Фильм уже сохранен' },
    userNotFound: { code: 404, message: 'Пользователь не найден' },
    unauthorizedSignout: { code: 401, message: 'Неудачный выход из аккаунта' },
    pageNotFound: { code: 404, message: 'Запрашиваемая страница не найдена' },
    requiredAuthorization: { code: 401, message: 'Необходима авторизация' },
  },
};

module.exports = {
  PORT,
  LOCALHOST,
  DBADDRES,
  NODE_ENV,
  JWT_SECRET,
};
