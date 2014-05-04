'use strict';

var knex = require('knex');

var user = require('./db/user');
var member = require('./db/member');
var venown = require('./db/venown');
var eventDB = require('./db/event');

exports.user = user;
exports.member = member;
exports.venown = venown;
exports.event = eventDB;

var connection = null;
exports.connection = connection;

exports.createConnection = function(db)
{
	exports.connection = connection = knex.initialize({
		client: 'mysql',
		connection: db
	});
	return exports.connection;
};
