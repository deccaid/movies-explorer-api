require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { limiter } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFounderError = require('./errors/NotFoundError');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/diplomFilm' } = process.env;

const app = express();

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use(requestLogger);
app.use(limiter);
app.use('/', require('./routes/index'));

app.use((req, res, next) => {
  next(new NotFounderError('Страницы не существует'));
});
app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT);
