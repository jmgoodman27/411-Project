// Require modules
var express = require('express');
var app = express();
var nunjucks  = require('nunjucks');
var bodyParser = require('body-parser');
var session = require("cookie-session");
var flash = require('connect-flash');

// Set views and template engine
app.set('views', './views/');
nunjucks.configure('views', {
  autoescape: true,
  express   : app
});
app.set('view engine', 'njk');

// Serve static assets when requested
app.use(express.static('public'));

// Passport and session
var passport = require('passport');
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))
app.use(passport.initialize());
app.use(passport.session());
var passport = require('./passport.js');
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(flash());

// Body parser
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// Set routes
app.use('/', require('./controllers/mainCtrl'));
app.use('/', require('./controllers/podcastCtrl'));

// Handle errors
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Start app
app.listen(3000);
