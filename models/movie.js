const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country" должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле "director" должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "duration" должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле "year" должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле "description" должно быть заполнено'],
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (URL) => validator.isURL(URL),
        message: 'Введите URL-адрес',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле "trailerLink" должно быть заполнено'],
      validate: [validator.isURL, 'Некорректный URL'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "thumbnail" должно быть заполнено'],
      validate: [validator.isURL, 'Некорректный URL'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле "owner" должно быть заполнено'],
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле "nameRU" должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "nameEN" должно быть заполнено'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
