'use strict';
var db = require('../db');

exports.read = function(req, res)
{
	db.venown.getAll(
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
	db.venown.add({email: b.email, pass: b.pass, namef: b.namef, namel: b.namel, nameu: b.nameu, phone: b.phone, address: b.address},
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
		db.venown.getById(id,
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
};