//Use this eventually, create a server
var express = require('express');

var auth = require('./lib/auth');
var db = require('./lib/db');
var rest = require('./lib/rest');
exports.auth = auth;
exports.db = db;
exports.rest = rest;

exports.stub = function(req, res)
{
	res.json(501, {error: 501, TODO: 'this'});
};