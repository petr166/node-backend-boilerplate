// get configs from environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;
const MONGO_HOST = process.env.MONGO_HOST || 'mongodb://localhost/hamamas';
const SECRET = process.env.SECRET || 'supersecretalltheway';

// config obj containing the app settings
module.exports = {
  env: NODE_ENV,
  server: {
    port: PORT,
  },
  mongo: {
    host: MONGO_HOST,
    options: {
      reconnectTries: Number.MAX_VALUE,
      useMongoClient: true,
    },
  },
  secret: SECRET,
};
