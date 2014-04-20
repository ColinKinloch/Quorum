#!/usr/bin/env node

var ip = '127.0.0.1';
var port = 9000;
var db = {
	ip: 'localhost',
	user: 'node',
	pass: 'guest'
};
console.log('Starting server at:', ip+':'+port);

var mysql = require('mysql');
var express = require('express'),
		morgan = require('morgan'),
		bodyParser = require('body-parser');
var restify = require('restify');

var app = express();
var restApp = restify.createServer();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/dist'));

app.listen(port, ip);