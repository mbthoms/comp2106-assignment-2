/**
 * Created by matthewthoms on 2016-03-17.
 */
var express = require('express');
var router = express.Router();

//Making sure the modules are included into the page.
// add auth package refs
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');
var configDb = require('../config/db.js');

// GET login - show login form
router.get('/login', function(req, res, next) {

    //Showing the login page.
    res.render('login/login', {
        title: 'Login',
        user: req.user
    });
});

// POST login - validate user

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login/login',
    failureMessage: 'Invalid Login'
}));

// GET register - show registration form
router.get('/register', function(req, res, next) {
    res.render('login/register', {
        title: 'Register'
    });
});


// POST register - save new user
router.post('/register', function(req, res, next) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('login/register', { title: 'Register' });
        }
        else {
            res.redirect('/login/login');
        }
    });
});

// make this public
module.exports = router, passport;