/*jslint devel: true, node: true*/

// Express
var express = require('express');
var app = express();

var index = require('./index');
console.log('Entering routes...');
app.get('/', index.listUsers);