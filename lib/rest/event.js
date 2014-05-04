'use strict';
var db = require('../db');

exports.read = function(req, res)
{
	db.event.getAll(
		function(rows)
		{
			console.log('All events:', rows);
			res.json(rows);
		},
		function(err)
		{
			console.error(err);
			res.json(500, err);
		});
};
exports.create = function(req, res)
{
	var b = req.body;
	db.event.add({name: b.name, type: b.type, description: b.description, starttime: b.starttime, endtime: b.endtime, capacity: b.capacity, venue: b.venue, owner: b.owner},
		function(rows)
		{
			console.log('Created venue', rows);
			res.json(201, rows);
		},
		function(err)
		{
			console.error(err);
			res.json(500, err);
		});
};

exports.query = function(req, res)
{
	//type = type of event
	//q = text to search for in description
	//start = starts after date (dd/mm/yyyy)
	//end = starts before date (dd/mm/yyyy)
	if(req.query.q)
	{
		var search = '%'.concat(req.query.q.concat('%').replace(/ /g, '% %')).split(' ');
	}
	var q = {
		q: search || undefined,
		type: req.query.type,
		start: new Date(req.query.start),
		end: new Date(req.query.end)
	};
	
	db.event.query(q,
		function(rows){
			res.json(rows);
		},
		function(err){
			res.json(500, err);
		});
};

exports.id = {
	read: function(req, res)
	{
		var id = req.params.id;
		db.event.getById(id,
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
		db.event.delById(req.params.id,
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