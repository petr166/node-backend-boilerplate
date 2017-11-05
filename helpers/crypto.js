/*
*  Promise-based abstraction for bcrypjs methods
*  Handle encoded hash values
*/
const bcryptjs = require('bcryptjs');
const Promise = require('bluebird');

// get a hash value, use to hash passwords before saving to db
const getHash = (value, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcryptjs.genSalt(saltRounds, (err, salt) => {
      if (err) return reject(new Error('Salt generate failed'));

      bcryptjs.hash(value, salt, (err1, hash) => {
        if (err1) return reject(new Error('Hash generate failed'));
        return resolve(hash);
      });
    });
  });
};

// compare a value to its hash, verify saved password
const compareHash = (value, toCompare) => {
  return new Promise((resolve, reject) => {
    bcryptjs.compare(value, toCompare, (err, result) => {
      if (err) return reject(new Error('Hash compare failed'));
      return resolve(result);
    });
  });
};

module.exports = { getHash, compareHash };
