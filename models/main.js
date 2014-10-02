/*jslint devel: true, node: true*/

// Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Passport
var passportLocalMongoose = require('passport-local-mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var userSchema = new Schema({});
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;
module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
};
module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
};