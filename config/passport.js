const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./index');

// initialize the strategies, pass a passport instance
const setup = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
    session: false,
  };

  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload._id, '-password') // eslint-disable-line
      .then((user) => {
        if (!user) return done(null, false);
        return done(null, user);
      })
      .catch(err => done(err, false));
  }));
};

module.exports = { setup };
