'use strict';
var db = require('../db');

exports.read = function(req, res)
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
};
exports.create = function(req, res)
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
};
exports.update = function(req, res)
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
};
exports.id = {
	read: function(req, res)
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
	update: function(req, res)
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
	},
	delete: function(req, res)
	{
		db.user.delById(req.params.id,
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
