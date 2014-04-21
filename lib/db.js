var crypto = require('crypto');
var knex = require('knex');

var user = require('./db/user');
var member = require('./db/member');
exports.user = user;
exports.member = member;

var connection = null;
exports.connection = connection;

exports.createConnection = function(db)
{
	exports.connection = connection = knex.initialize({
		client: 'mysql',
		connection: db
	});
	return exports.connection;
}
