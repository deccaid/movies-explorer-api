const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFounderError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

// добавление пользователя

module.exports.addUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => res.status(HTTP_STATUS_CREATED).send({
        name: user.name, _id: user._id, email: user.email,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Указанный адрес электропочты занят, введите другой'));
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else {
          next(err);
        }
      }));
};

// логин

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const jwtSecretWord = process.env.NODE_ENV !== 'production'
        ? 'not-secret-key'
        : process.env.JWT_SECRET;
      const token = jwt.sign(
        { _id: user._id },
        jwtSecretWord,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => next(err));
};

// получение данных

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch(next);
};

// редактирование данных

module.exports.editUserMe = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Указанный адрес электропочты занят, введите другой'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFounderError('Пользователь с таким ID не найден'));
      } else {
        next(err);
      }
    });
};
