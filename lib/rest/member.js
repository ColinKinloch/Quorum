'use strict';
var db = require('../db');

exports.read = function(req, res)
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
exports.create = function(req, res)
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
};
exports.id = {
	read: function(req, res)
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
	},
	update: function(req, res)
	{
		var b = req.body;
		var id = req.params.id;
		db.member.updateById({uid: id, email: b.email, pass: b.pass, namef: b.namef, namel: b.namel, nameu: b.nameu, gold: b.gold})
	},
	delete: function(req, res)
	{
		
		db.member.delById(req.params.id,
			function(rows)
			{
				if(0===rows)
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
		);
	}
};