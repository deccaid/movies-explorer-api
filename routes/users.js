const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserMe, editUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().pattern(/^\S+@\S+\.\S+$/),
  }),
}), editUserMe);

module.exports = router;
