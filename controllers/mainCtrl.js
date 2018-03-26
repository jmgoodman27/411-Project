var express = require('express');
var router = express.Router();
var users = require('../models/userModel');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var passport = require('passport');

router.get('/', function (req, res) {
    res.render('home');
});

router.get('/login', function (req, res) {
    res.render('login', { success: req.flash('success'), error: req.flash('error') });
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

router.get('/account', function (req, res) {
    res.render('account');
});

router.get('/create-account', function (req, res) {
    res.render('create-account');
});
router.post('/create-account', [
    check('username').isLength({ min: 1 }).withMessage('Username is required.').custom(username => {
        return users.getUser(username).then((value) => {
            if (value && value.username == username) {
                throw new Error('Username already exists');
            }
        })
    }),
    check('password', 'Passwords must be at least 5 characters long').isLength({ min: 5 }).exists(),
    check('full_name', 'Full name is required').isLength({ min: 1 })],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('create-account', { data: req.body, errors: errors.array() });
        } else {
            const user = matchedData(req);
            users.addUser(user.username, user.password, user.full_name).then(() => {
                req.flash('success', 'You have successfully created an account!');
                res.redirect('/login');
            }).catch((err) => {
                if(err) {
                    res.render('create-account', { error: true });
                }
            })
        }
    });

module.exports = router;
