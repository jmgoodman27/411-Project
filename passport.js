var users = require('./models/userModel.js');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy(
  function(username, password, done) {
    users.getUser(username).then((user) => {
        if (user && user.password == password) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
    })
}));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    users.getUser(username).then((user) => {
        if (user) {
            return done(null, user);
        }
        else {
            return done (null, false);
        }
    })
});
