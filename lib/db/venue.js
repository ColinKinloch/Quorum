'use strict';
var db = require('../db');
var auth = require('../auth');

var table = 'venue';
exports.table = table;

exports.getAll = function(cb, cbe)
{
	db.connection(table)
		.select('vid', 'name', 'type', 'address', 'description', 'owner')
		.then(cb, cbe);
};
exports.getById = function(id, cb, cbe)
{
	db.connection(table)
		.where('vid', id)
		.select('vid', 'name', 'type', 'address', 'description', 'owner')
		.then(cb, cbe);
};
exports.getByOwner = function(owner, cb, cbe)
{
	db.connection(table)
		.where('owner', owner)
		.select('vid', 'name', 'type', 'address', 'description', 'owner')
		.then(cb, cbe);
};
exports.add = function(venue, cb, cbe)
{
	var newVenue = exports.normalise(venue);
	db.connection(table)
		.insert(newVenue)
		.then(cb, cbe);
};
exports.updateById = function(venue, cb, cbe)
{
	var id = venue.vid;
	var newVenue = exports.normalise(venue);
	delete newVenue.vid;
	db.connection(table)
		.where('vid', id)
		.update(newVenue)
		.then(cb, cbe);
};

exports.delById = function(id, cb, cbe)
{
	db.connection(table)
		.where('vid', id)
		.del()
		.then(cb, cbe);
};

exports.normalise = function(venue)
{
	var newVenue = {
		vid: venue.vid,
		name: venue.name,
		type: venue.type,
		address: venue.address,
		description: venue.description,
		owner: venue.owner
	};
	
	for(var i in newVenue)
	{
		if(newVenue[i] === undefined)
		{
			delete newVenue[i];
		}
	}
	return newVenue;
};