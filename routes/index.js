/*jslint devel: true, node: true*/
var express = require('express');

// Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// GET home page
exports.listUsers = function(req, res) {
	var db = req.db;
	console.log(req.db);

	db.User.collection.find({user: {$in: [/.*/]}}, function(err, docs) {
		if(docs.length) {
			res.render('index', {
				'title': 'Heaven is a Parallel Universe',
				'username': docs.each(function(err, doc) {
					return doc.user;
				})
			});
		}
		else {
			res.render('index', {
				'title': 'Heaven is a Parallel Universe'
			});
		}
	});
};

// POST data entry
/*router.post('/', function(req, res) {
	// Set internal DB variable
	var db = req.db;
	
	// Get form values
	var data = req.body.data;
	
	// Set collection
	var collection = db.get('User');
	
	// Submit to DB
	collection.insert({
		'location': 'LAB',
        'action': data
	}, function(err, doc) {
		if(err) {
			// Return error
			res.send('There was a problem adding the information to the database.');
		}
		else {
			res.location('/');
			res.redirect('/');
		}
	});
	db.close();
});

module.exports = router;*/