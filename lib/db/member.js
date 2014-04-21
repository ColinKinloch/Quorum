var db = require('../db');
var auth = require('../auth');

exports.getAll = function(cb, cbe)
{
	//SELECT user.uid, user.email, user.namef, user.namel, member.nameu, member.gold FROM member, user WHERE member.uid = user.uid
	db.connection('member')
		.join('user', 'user.uid', '=', 'member.uid')
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', 'member.nameu', 'member.gold')
		.then(cb, cbe);
	/*
	db.connection.query('SELECT user.uid, user.email, user.namef, user.namel, member.nameu, member.gold FROM member, user WHERE member.uid = user.uid',
		function(err, rows)
		{
			if(err) console.log(err);
			if(callback) callback(rows);
		}
	);*/
}
exports.getById = function(id, cb, cbe)
{
	db.connection('member')
		.join('user', 'user.uid', '=', 'member.uid')
		.where('user.uid', id)
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', 'member.nameu', 'member.gold')
		.then(cb, cbe);
}
exports.getByEmail = function(email, cb, cbe)
{
	//SELECT user.uid, user.email, user.namef, user.namel, member.nameu, member.gold FROM member, user WHERE member.uid = user.uid AND user.email = [email]
	db.connection('member')
		.join('user', 'user.uid', '=', 'member.uid')
		.where('user.email', email)
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', 'member.nameu', 'member.gold')
		.then(cb, cbe);
	/*
	db.connection.query('SELECT user.uid, user.email, user.namef, user.namel, member.nameu, member.gold FROM member, user WHERE member.uid = user.uid AND user.email = ?',
		[email],
		function(err, rows)
		{
			if(err) console.log(err);
			if(callback) callback(rows);
		}
	);*/
}
exports.add = function(member, cb, cbe)
{
	var user = {
		email: member.email,
		namef: member.namef,
		namel: member.namel,
		pass: member.pass
	};
	db.user.add(user, function(id){
		//TODO determine whether id = uid
		member.uid = id;
		delete member.email;
		delete member.namef;
		delete member.namel;
		delete member.pass;
		db.connection('member')
			.insert(member)
			.then(cb, cbe);
	}, cbe)
	/*db.user.add({email: user.email, pass: passHash, namef: user.namef, namel: user.namel},
		function(rows)
		{
			db.user.getByEmail(user.email,
				function(rows)
				{
					db.connection.query('INSERT INTO member (uid, nameu, gold) VALUES (?, ?, ?);',
						[rows[0].uid, user.nameu, user.gold],
						function(err, rows)
						{
							if(err) console.log(err);
							if(callback) callback(rows);
						});
				});
		}
	)*/
}
exports.updateById = function(member, cb, cbe)
{
	var id = member.uid;
	var user = {
		uid: id,
		email: member.email,
		namef: member.namef,
		namel: member.namel,
		pass: member.pass
	};
	db.user.updateById(user, function(id)
	{
		member.uid = member.email = member.namef = member.namel = member.pass = undefined;
		// UPDATE member SET [member] WHERE uid = [id]
		db.connection('member')
			.where('uid', id)
			.update(member)
			.then(cb, cbe);
	}, cbe);
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