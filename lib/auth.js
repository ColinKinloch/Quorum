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
	
	db.user.authenticate(email, password,
		function(rows)
		{
			if(rows.length > 0)
			{
				console.log('rows:', rows);
				var profile = {
					uid: rows.uid,
					email: rows.email,
					namef: rows.namef,
					namel: rows.namel
				}
				var token = jwt.sign(profile, exports.secret, {audience:'member', expiresInMinutes: 5*60});
				res.json({token: token});
			}
			else
			{
				res.json(401, {error: 'failed to authenticate'})
			}
		},
		function(err)
		{
			console.log(err);
			res.json(500, {sqlerror: err, error: 'SQL Error'});
		});
};

exports.hash = function(string) {
	return crypto.createHash('md5').update(string).digest('hex');
};
/*exports.verifyUser = function(user, pass, callback)
{
	var passHash = exports.hash(pass);
};*/