'use strict';
var db = require('../db');

exports.read = function(req, res)
{
	db.venue.getAll(
		function(rows)
		{
			console.log('All venues:', rows);
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
	db.venue.add({name: b.name, type: b.type, address: b.address, description: b.description, owner: b.owner},
		function(rows)
		{
			console.log('Created venue', rows);
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
		db.venue.getById(id,
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
		db.venue.delById(req.params.id,
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