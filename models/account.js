/**
 * Created by matthewthoms on 2016-03-17.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
//Account Schema
var Account = new schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

//Making it public.
module.exports = mongoose.model('Account', Account);

