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


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, user) {
        done(err, user);
    });
});


// GET login - show login form
router.get('/login', function(req, res, next) {
    // store the session messages in a local variable
    var messages = req.session.messages || [];

    // clear the session messages
    req.session.messages = [];

    // show the login page and pass in any messages we may have
    res.render('login/login', {
        title: 'Login',
        user: req.user,
        messages: messages
    });
});

//Validating the User.
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login/login',
    failureMessage: 'Invalid Login'
    //failureFlash: true
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
            /*req.login(account, function(err) {
             res.redirect('/articles');
             });*/
            res.redirect('/login/login');
        }
    });
});






//Making the page public.
module.exports = router, passport;