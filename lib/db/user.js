'use strict';
var db = require('../db');
var auth = require('../auth');

exports.getAll = function(cb, cbe)
{
	db.connection('user')
		.select('uid', 'email', 'namef', 'namel')
		.then(cb, cbe);
};
exports.getById = function(id, cb, cbe)
{
	// SELECT uid, email, namef, namel FROM user WHERE uid = [id]
	db.connection('user')
		.where('uid', id)
		.select('uid', 'email', 'namef', 'namel')
		.then(cb, cbe);
};
exports.getByEmail = function(email, cb, cbe)
{
	db.connection('user')
		.where('email', email)
		.select('uid', 'email', 'namef', 'namel')
		.then(cb, cbe);
};
exports.add = function(user, cb, cbe)
{
	var newUser = exports.normalise(user);
	// INSERT INTO user (email, passh, namef, namel) VALUES ([user.email], [user.passh], [user.namef], [user.namel])
	db.connection('user')
		.insert(newUser)
		.then(cb, cbe);
};
exports.updateById = function(user, cb, cbe)
{
	var id = user.uid;
	var newUser = exports.normalise(user);
	delete newUser.uid;
	// UPDATE user SET [user] WHERE uid = [id]
	db.connection('user')
		.where('uid', id)
		.update(newUser)
		.then(cb, cbe);
};

exports.delById = function(id, cb, cbe)
{
	db.connection('user')
		.where('uid', id)
		.del()
		.then(cb, cbe);
};

exports.authenticate = function(email, password, cb, cbe)
{
	var passh = auth.hash(password);
	db.connection('user')
		.where({
			email: email,
			passh: passh
		})
		.select('uid', 'email', 'namef', 'namel')
		.then(cb, cbe);
};

exports.normalise = function(user)
{
	var newUser = {
		uid: user.uid,
		email: user.email,
		namef: user.namef,
		namel: user.namel
	};
	
	if(user.pass)
	{
		newUser.passh = auth.hash(user.pass);
	}
	else if(user.passh)
	{
		newUser.passh = user.passh;
	}
	
	for(var i in newUser)
	{
		if(newUser[i] === undefined)
		{
			delete newUser[i];
		}
	}
	return newUser;
};