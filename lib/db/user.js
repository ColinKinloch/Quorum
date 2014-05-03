'use strict';
var db = require('../db');
var auth = require('../auth');

exports.getAll = function(cb, cbe)
{
	db.connection('user')
		.select('uid', 'email', 'namef', 'namel')
		.then(cb, cbe);
	/*
	db.connection.query('SELECT uid, email, namef, namel FROM user',
		function(err, rows)
		{
			if(err) console.log(err);
			if(callback) callback(rows);
		}
	);
	*/
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
	/*
	db.connection.query('SELECT uid, email, namef, namel FROM user WHERE email = ?',
		[email],
		function(err, rows)
		{
			if(err) console.log(err);
			if(callback) callback(rows);
		}
	);
	*/
};
exports.add = function(user, cb, cbe)
{
	var newUser = exports.normalise(user);
	// INSERT INTO user (email, passh, namef, namel) VALUES ([user.email], [user.passh], [user.namef], [user.namel])
	db.connection('user')
		.insert(newUser)
		.then(cb, cbe);
	/*
	db.connection.query('INSERT INTO user (email, passh, namef, namel) VALUES (?, ?, ?, ?)',
		[user.email, passHash, user.namef, user.namel],
		function(err, rows)
		{
			if(err) console.log(err);
			if(callback) callback(rows);
		}
	);
	*/
};
exports.updateById = function(user, cb, cbe)
{
	var id = user.uid;
	var newUser = exports.normalise(user);
	console.log('Okay:', id, ',', user.email);
	delete newUser.uid;
	// UPDATE user SET [user] WHERE uid = [id]
	db.connection('user')
		.where('uid', id)
		.update(user)
		.then(cb, cbe);
	/*
	if(user.pass) passHash = auth.hash(user.pass);
	db.connection.query('UPDATE user SET WHERE uid=:uid',
		[user.email, passHash, user.namef, user.namel],
		function(err, rows)
		{
			if(err) console.log(err);
			if(callback) callback(rows);
		}
	);*/
};

exports.delById = function(id, cb, cbe)
{
	db.connection('user')
		.where('uid', id)
		.del()
		.then(cb, cbe);
}

exports.normalise = function(user)
{
	var newUser = {
		uid: user.uid,
		email: user.email,
		namef: user.namef,
		namel: user.namel
	}
	
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