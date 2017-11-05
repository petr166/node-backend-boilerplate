const mongoose = require('mongoose');
const crypto = require('../helpers/crypto');
const Promise = require('bluebird');
const emailValidator = require('email-validator');

// user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [4, 'The username should have at least {MINLENGTH} characters'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
  },
  name: String,
});

let User;

// static methods
UserSchema.statics.createUser = (data) => {
  if (data.password.length < 6) {
    return Promise.reject(new Error('The password should have at least 6 characters'));
  }

  if (!emailValidator.validate(data.email)) {
    return Promise.reject(new Error('The email is invalid'));
  }

  const user = new User(data);
  // hash the user's password before saving
  return crypto.getHash(user.password)
    .then((hash) => {
      user.password = hash;
      return user.save()
        .then((savedUser) => {
          return { ...savedUser._doc, password: undefined }; // eslint-disable-line
        });
    });
};

UserSchema.statics.authenticate = (creds) => {
  return User.findOne({ username: creds.username }).lean()
    .then((user) => {
      if (!user) return Promise.reject(new Error('User not found'));
      return crypto.compareHash(creds.password, user.password)
        .then(() => {
          return { ...user, password: undefined };
        });
    });
};

User = mongoose.model('User', UserSchema);
module.exports = User;
