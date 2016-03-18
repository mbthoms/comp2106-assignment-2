/**
 * Created by matthewthoms on 2016-03-17.
 */
var express = require('express');
var router = express.Router();

//Making sure the modules are included into the page.
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');
var configDb = require('../config/db.js');

//Routing the Login Page.
router.get('/login', function(req, res, next) {
    //Rendering the Login Page.
    res.render('login/login', {
        title: 'Login',
        user: req.user
    });
});

//Validating the User.
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login/login',
    failureMessage: 'Invalid Login'
}));

//Routing the Register Page.
router.get('/register', function(req, res, next) {
    res.render('login/register', {
        title: 'Register'
    });
});

//Saving the User, Using the register page.
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
//Making the page public.
module.exports = router, passport;