'use strict';
var db = require('../db');

exports.getAll = function(cb, cbe)
{
	db.connection('event')
		.select('eid', 'name', 'type', 'description', 'starttime', 'endtime', 'capacity', 'venue', 'owner')
		.then(cb, cbe);
};
exports.getById = function(id, cb, cbe)
{
	db.connection('event')
		.where('eid', id)
		.select('eid', 'name', 'type', 'description', 'starttime', 'endtime', 'capacity', 'venue', 'owner')
		.then(cb, cbe);
};
exports.add = function(event, cb, cbe)
{
	var newEvent = exports.normalise(event);
	console.log(newEvent);
	
	db.connection('event')
		.insert(newEvent)
		.then(cb, cbe);
};
exports.updateById = function(event, cb, cbe)
{
	var id = event.eid;
	var newEvent = exports.normalise(event);
	delete newEvent.eid;
	
	db.connection('event')
		.where('eid', id)
		.update(newEvent)
		.then(cb, cbe);
};

exports.delById = function(id, cb, cbe)
{
	db.connection('event')
		.where('eid', id)
		.del()
		.then(cb, cbe);
};

exports.query = function(q, cb, cbe)
{
	var newQuery = exports.normaliseQuery(q);
	//type = type of event
	//q = text to search for in description
	//start = starts after date (dd/mm/yyyy)
	//end = starts before date (dd/mm/yyyy)
	db.connection('event')
		.where({
			type:newQuery.type
		})
		.then(cb, cbe);
};


/*exports.authenticate = function(email, password, cb, cbe)
{
	var passh = auth.hash(password);
	db.connection('user')
		.where({
			email: email,
			passh: passh
			})
		.select('uid', 'email', 'namef', 'namel')
		.then(cb, cbe);
}*/

exports.normaliseQuery = function(q)
{
	var newQuery = {
		type: q.type,
		q: q.q,
		start: q.start,
		end: q.end
	};
	for(var i in newQuery)
	{
		if(newQuery[i] === undefined)
		{
			delete newQuery[i];
		}
	}
	return newQuery;
};
exports.normalise = function(event)
{
	var newEvent = {
		eid: event.eid,
		name: event.name,
		type: event.type,
		description: event.description,
		starttime: event.starttime,
		endtime: event.endtime,
		capacity: event.capacity,
		venue: event.venue,
		owner: event.owner
	};
	
	for(var i in newEvent)
	{
		if(newEvent[i] === undefined)
		{
			delete newEvent[i];
		}
	}
	return newEvent;
};