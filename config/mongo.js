const mongoose = require('mongoose');
const Promise = require('bluebird');
const log = require('../log');

mongoose.Promise = Promise; // plug-in bluebird as mongoose Promise

// connect to mongo host, set retry on initial fail
const connectMongo = (config) => {
  mongoose.connect(config.host, config.options)
    .catch(() => {
      setTimeout(() => { connectMongo(config); }, 2000);
    });
};

// to export: init mongo connection, set logging
const start = (config) => {
  return new Promise((resolve) => {
    mongoose.connection.on('open', () => {
      log.log('mongo', `connected to db: "${config.host}"`);
      return resolve();
    });
    mongoose.connection.on('error', (err) => {
      log.err('mongo', 'error', err.message);
    });
    connectMongo(config);
  });
};

module.exports = { start };
