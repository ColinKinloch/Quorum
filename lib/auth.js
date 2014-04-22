'use strict';
//var db = require('./db');
var crypto = require('crypto');

exports.hash = function(string)
{
	return crypto.createHash('md5').update(string).digest('hex');
};
/*exports.verifyUser = function(user, pass, callback)
{
	var passHash = exports.hash(pass);
};*/