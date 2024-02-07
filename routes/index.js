const router = require('express').Router();
const usersRouter = require('./users');
const signupRouter = require('./signup');
const moviesRouter = require('./movies');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
