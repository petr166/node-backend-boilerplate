const router = require('express').Router();
const User = require('../models/user');
const log = require('../log');
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');

router.post('/register', (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return next(new Error('Missing request fields'));
  }

  User.createUser(req.body)
    .then((user) => {
      log.log('auth', 'new user registered');
      res.json({ success: true, user });
    })
    .catch((err) => {
      log.err('/register', 'user register failed', err.message);
      return next(err);
    });
});


router.post('/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return next(new Error('Missing request fields'));
  }

  User.authenticate(req.body)
    .then((user) => {
      const token = jwt.sign(user, config.secret, {});
      log.log('auth', 'new user registered');
      res.json({
        success: true,
        msg: 'Use the token to authenticate the requests',
        token: 'Bearer ' + token,
        user,
      });
    })
    .catch((err) => {
      log.err('/login', 'user login failed', err.message);
      return next(err);
    });
});


router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ success: true, user: req.user });
});


module.exports = router;
