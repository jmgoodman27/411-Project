// Require modules
var express = require('express');
var app = express();
var nunjucks  = require('nunjucks');

// Set views and template engine
app.set('views', './views/');
nunjucks.configure('views', {
  autoescape: true,
  express   : app
});
app.set('view engine', 'njk');

// Serve static assets when requested
app.use(express.static('./public/'));

// Set routes
app.use('/', require('./routes/mainRoute'));

// Handle errors
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Start app
app.listen(3000);
