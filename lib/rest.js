var auth = require('./auth');
var db = require('./db');

exports.user = {
	get: function(req, res)
	{
		console.log('user, get');
		db.user.getAll(function(rows)
		{
			res.json(rows);
		},
		function(err)
		{
			console.log(err);
			res.json(err);
		});
	},
	post: function(req, res)
	{
		var b = req.body;
		db.user.add({email: b.email, pass: b.pass, namef: b.namef, namel: b.namel},
			function(rows)
			{
				console.log('Created User', rows);
				res.json(rows);
			},
			function(err)
			{
				console.error(err);
				res.json(err);
			}
		);
	},
	put: function(req, res)
	{
		
	},
	id: {
		get: function(req, res)
		{
			db.user.getById(req.params.id,
				function(rows)
				{
					console.log('By email,', req.params.email, ':\n', rows);
					res.json(rows);
				},
				function(err)
				{
					console.error(err);
					res.json(err);
				}
			);
		}
	}
};

exports.member = {
	get: function(req, res)
	{
		db.member.getAll(
			function(rows)
			{
				console.log('All Members:', rows);
				res.json(rows);
			},
			function(err)
			{
				console.error(err);
				res.json(err);
			}
		);
	},
	post: function(req, res)
	{
		var b = req.body;
		db.member.add({email: b.email, pass: b.pass, namef: b.namef, namel: b.namel, nameu: b.nameu, gold: b.gold},
			function(rows)
			{
				console.log('Created Member', rows);
				res.json(rows);
			},
			function(err)
			{
				console.error(err);
				res.json(err);
			}
		);
	},
	id: {
		get: function(req, res)
		{
			var id = req.params.id;
			db.member.getById(id,
				function(rows)
				{
					console.log('By id,', id, ':\n', rows);
					res.json(rows);
				},
				function(err)
				{
					console.error(err);
					res.json(err);
				}
			);
		}
	}
};

exports.updateUserById = function(req, res)
{
	var b = req.body;
	db.user.updateById({uid: b.uid, email: b.email, namef: b.namef, namel: b.namel},
		function(rows)
		{
			console.log('update users:', rows);
			res.json(rows);
		},
		function(err)
		{
			console.error(err);
			res.json(err);
		})
}

exports.getAllMembers = function(req, res)
{
	db.member.getAll(
		function(rows)
		{
			console.log('All Members:', rows);
			res.json(rows);
		},
		function(err)
		{
			console.error(err);
			res.json(err);
		}
	);
}

exports.getMemberByEmail = function(req, res)
{
	db.member.getByEmail(req.params.email,
		function(rows)
		{
			console.log('member by email,', req.params.email, ':\n', rows);
			res.json(rows);
		},
		function(err)
		{
			console.error(err);
			res.json(err);
		}
	);
	/*
	db.connection.query('SELECT uid, email, namef, namel FROM member WHERE email = ?',
		[req.params.email],
		function(err, rows)
		{
			console.log(req.params.email, rows);
			res.json(rows);
		}
	);*/
}
exports.updateMemberByEmail = function(req, res)
{
	res.send('phych!');
}


exports.getVerified = function(email, pass, callback)
{
	var passHash = auth.hash(pass);
	db.connection.query('SELECT (CASE WHEN passh = ? THEN 1 ELSE 0 END) AS verified FROM user WHERE email = ?', [passHash, email], function(err, res)
		{
			if(res[0]) callback(Boolean(res[0].verified));
			else callback(false);
		}
	);
}