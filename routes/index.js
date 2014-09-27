var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res) {
	var db = req.db;
	var collection = db.get('datacollection');
	collection.find({}, {}, function(e, docs) {
		res.render('index', {
			'title': 'Heaven is a Parallel Universe',
			'output': docs
		});
	});
});

// POST data entry
router.post('/', function(req, res) {
	// Set internal DB variable
	var db = req.db;
	
	// Get form values
	var data = req.body.data;
	
	// Set collection
	var collection = db.get('datacollection');
	
	// Submit to DB
	collection.insert({
		'data': data
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
});

module.exports = router;