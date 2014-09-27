/*jslint devel: true, node: true*/

// Express
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// MongoDB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/hiapu');

// Set up routes
var routes = require('./routes/index');

// Jade template views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Compression
var compression = require('compression');
app.use(compression({
	threshold: 512
}));

// Static files
var serveStatic = require('serve-static');
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, 'public/css')));
app.use(serveStatic(path.join(__dirname, 'public/js')));
app.use(serveStatic(path.join(__dirname, 'public/fonts')));

// Database
app.use(function(req, res, next) {
	req.db = db;
	next();
});

// Routes
app.use('/', routes);

// Catch 404
/*app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});*/

// Production error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;

var server = app.listen(80, function() {
	console.log('Listening on port %d', server.address().port);
});