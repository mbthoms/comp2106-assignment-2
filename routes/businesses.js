/**
 * Created by matthewthoms on 2016-03-17.
 */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Business = require('../models/business');
var passport = require('passport');

//Setting up the GET handler for the Businesses page.
router.get('/', LoggedIn, function(req, res, next) {
    //Using the Business model to import all the data.
    Business.find(function (err, business) {
        //If there is an error.
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //If there is data.
            //Showing the page and importing the data into the page.
            res.render('business/index', {
                title: 'Businesses List',
                businesses: business
            });
        }
    });
});

//GET handler for the creating of a new business.
router.get('/add', function(req, res, next) {

    if (req.isAuthenticated()) {
        res.render('businesses/create', {
            title: 'Add a New Business'
        });
    }
    else {
        res.redirect('/login/login');
    }
});


// POST handler for create the data entry process to the form.
router.post('/create', LoggedIn, function(req, res, next) {

    //Creating a new entry into the database using the business model and mongoose module.
    Business.create( {
            businessName: req.body.businessName,
            about: req.body.about,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        }
    );
    //Redirecting to the businesses Page.
    res.redirect('/businesses');
});

//GET handler to  edit the information you selected and populate it into the from.
router.get('/:id', LoggedIn, function(req, res, next) {
    //Creating a variable to store the id of the data from the url.
    var id = req.params.id;
    //Looking up the selected Business information.
    Business.findById(id,  function(err, business) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show the edit view
            res.render('businesses/edit', {
                title: 'Business Details',
                business: business
            });
        }
    });
});

//POST handler for editing the information from the database.
router.post('/:id', LoggedIn, function(req, res, next) {
    //Creating a variable to store the id of the data from the url.
    var id = req.params.id;

    //Filling the business object with the information from the database.
    var business = new Business( {
        _id: id,
        title: req.body.title,
        content: req.body.content
    });

    //Updating the database using the mongoose module and the business model.
    Business.update( { _id: id }, business, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesses');
        }
    });
});

//GET handler to delete a business with the id from the url.
router.get('/delete/:id', LoggedIn, function(req, res, next) {
    // Grabbing the id from the url.
    var id = req.params.id;
    console.log('Deleting...');

    Business.remove({ _id: id }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //Redirecting back to the business list to show the updated list.
            res.redirect('/businesses');
        }
    });
});

//Checking if the user is logged in.
function LoggedIn(req, res, next) {
    //Making sure the user is authenticated.
    if (req.isAuthenticated()) {
        return next;
    }
    else {
        res.redirect('/login/login');
    }
}

//Making it public.
module.exports = router;