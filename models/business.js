/**
 * Created by matthewthoms on 2016-03-17.
 */
//Linking to Mongoose.
var mongoose = require('mongoose');

//Defining the articles Schema.
var businessSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    businessName: {
        type: String,
        default: '',
        trim: true,
        required: 'Name is required and cannot be blank.'
    },
    about: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    }
});

//Making it Public.
module.exports = mongoose.model('Business', businessSchema);