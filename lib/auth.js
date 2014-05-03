'use strict';
var db = require('./db');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

exports.secret = 'guest';

exports.userToken = function(req, res)
{
	var email = req.headers.username;
	var password = req.headers.password;
	console.log(email, password);
	
	var profile = {
		uid: 1,
		email: 'colin@gmail.com',
		namef: 'colin', 
		namel: 'kinloch'
	}
	
	if(profile)
	{
		var token = jwt.sign(profile, exports.secret, { expiresInMinutes: 5*60});
		res.json({token: token});
	}
	else
	{
		res.json(401, {error: 'failed to authenticate'});
	}
};

exports.hash = function(string) {
	return crypto.createHash('md5').update(string).digest('hex');
};
/*exports.verifyUser = function(user, pass, callback)
{
	var passHash = exports.hash(pass);
};*/