const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// onnect to the database
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

// configure json in the body
app.use(bodyParser.json());

// create cookie to save the user session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// initialize session using passport
app.use(passport.initialize());
app.use(passport.session());

// set port for dev or prod
const port = process.env.PORT || 5000;

// import the user model, passport and the routes needed for
// authentication
require('./models/user');
require('./services/passport.js');
require('./routes/authRoutes.js')(app);

// require('./routes//billingRoutes.js')(app);

app.listen(port);
