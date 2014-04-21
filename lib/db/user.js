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
}
exports.getById = function(id, cb, cbe)
{
	// SELECT uid, email, namef, namel FROM user WHERE uid = [id]
	db.connection('user')
		.where('uid', id)
		.select('uid', 'email', 'namef', 'namel')
		.then(cb, cbe);
}
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
}
exports.add = function(user, cb, cbe)
{
	if(user.pass)
	{
		user.passh = auth.hash(user.pass);
		delete user.pass;
	}
	// INSERT INTO user (email, passh, namef, namel) VALUES ([user.email], [user.passh], [user.namef], [user.namel])
	db.connection('user')
		.insert(user)
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
}
exports.updateById = function(user, cb, cbe)
{
	var id = user.uid;
	user.uid = undefined;
	if(user.pass)
	{
		user.passh = auth.hash(user.pass);
		user.pass = undefined;
	}
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
}