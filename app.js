var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//Using Mongoose Module
var mongoose = require('mongoose');

//Modules that work with the login/Register.
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;



var routes = require('./routes/index');
var users = require('./routes/users');
var business = require('./routes/businesses')
var login = require('./routes/login');

var app = express();
//The views engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Allowing flash to show the messages that are saved in the session.
app.use(flash());

//Configuring the Passport Module.
app.use(session({
    secret: 'assignment-2 login',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Using the Account Model.
var Account = require('./models/account');
passport.use(Account.createStrategy());
passport.use(new LocalStrategy(Account.authenticate()));

//Accessing the Session information.
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


app.use('/', routes);
app.use('/users', users);
app.use('/businesses', business);
app.use('/login', login);


//Connecting to the database using Mongoose.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB Error: '));

db.once('open', function(callback) {
    //If the database is connected display message in console.
    console.log('Connected to mongodb');
});

//Reading the Database Connection from the config/db.js file.
var configDb = require('./config/db.js');
mongoose.connect(configDb.url);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

//Error Handler.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;