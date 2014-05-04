'use strict';
var db = require('../db');

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