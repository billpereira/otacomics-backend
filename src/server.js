const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true });

const app = express();
app.use(bodyParser.json())
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;

require('./models/user');
require('./services/passport.js');
require('./routes/authRoutes.js')(app);
// require('./routes//billingRoutes.js')(app);

app.listen(port);
