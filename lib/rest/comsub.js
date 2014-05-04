'use strict';
var db = require('../db');

exports.read = function(req, res)
{
	db.comsub.getAll(
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
	db.comsub.add({email: b.email, pass: b.pass, namef: b.namef, namel: b.namel, nameu: b.nameu, company: b.company},
		function(rows)
		{
			console.log('Created Venown', rows);
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
		db.comsub.getById(id,
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
	delete: function(req, res)
	{
		db.comsub.delById(req.params.id,
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