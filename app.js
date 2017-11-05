const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errorMiddleware = require('./middleware/error');
const passport = require('passport');
const setupPassport = require('./config/passport').setup;

// import routes
const userRoutes = require('./routes/user');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
setupPassport(passport);

// healthcheck
app.get('/', (req, res) => {
  res.json({ success: true, msg: 'API is live' });
});

// set routes
app.use('/user', userRoutes);

// set error handling middleware
app.use(errorMiddleware);

module.exports = app;
