'use strict';
var auth = require('./auth');
var db = require('./db');

exports.user =
{
	get: function(req, res)
	{
		console.log(req.user);
		db.user.getAll(function(rows)
		{
			res.json(rows);
		},
		function(err)
		{
			console.log(err);
			res.json(500, err);
		});
	},
	post: function(req, res)
	{
		var b = req.body;
		db.user.add({email: b.email, pass: b.pass, namef: b.namef, namel: b.namel},
			function(rows)
			{
				res.json(201, rows);
			},
			function(err)
			{
				console.error(err);
				res.json(500, err);
			}
		);
	},
	put: function(req, res)
	{
		var b = req.body;
		db.user.updateById({uid: b.uid, email: b.email, pass: b.pass, namef: b.namef, namel: b.namel},
			function(rows)
			{
				res.json(200, rows);
			},
			function(err)
			{
				console.error(err);
				res.json(500, err);
			}
		);
	},
	id:
	{
		get: function(req, res)
		{
			db.user.getById(req.params.id,
				function(rows)
				{
					res.json(rows);
				},
				function(err)
				{
					console.error(err);
					res.json(500, err);
				}
			);
		},
		del: function(req, res)
		{
			db.user.delById(req.params.id,
				function(rows)
				{
					if(0==rows)
					{
						res.status(404);
					}
					res.json(rows);
				},
				function(err)
				{
					console.error(err);
					res.json(500, err);
				}
			)
		}
	}
};

exports.member =
{
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
				res.json(500, err);
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
				res.json(201, rows);
			},
			function(err)
			{
				console.error(err);
				res.json(500, err);
			}
		);
	},
	id:
	{
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
					res.json(500, err);
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
			res.json(500, err);
		});
};

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
			res.json(500, err);
		}
	);
};

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
			res.json(500, err);
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
};