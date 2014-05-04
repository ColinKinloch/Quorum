'use strict';
var db = require('../db');
var auth = require('../auth');

var table = 'venueowner';
exports.table = table;

exports.getAll = function(cb, cbe)
{
	db.connection(table)
		.join('user', 'user.uid', '=', table+'.uid')
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', table+'.nameu', table+'.phone', table+'.address')
		.then(cb, cbe);
};
exports.getById = function(id, cb, cbe)
{
	db.connection(table)
		.join('user', 'user.uid', '=', table+'.uid')
		.where('user.uid', id)
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', table+'.nameu', table+'.phone', table+'.address')
		.then(cb, cbe);
};
exports.getByEmail = function(email, cb, cbe)
{
	db.connection(table)
		.join('user', 'user.uid', '=', table+'.uid')
		.where('user.email', email)
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', table+'.nameu', table+'.phone', table+'.address')
		.then(cb, cbe);
};
exports.add = function(venown, cb, cbe)
{
	var newUser = db.user.normalise(venown);
	var newVenown = exports.normalise(venown);
	
	db.user.add(newUser, function(id){
		newVenown.uid = id;
		db.connection(table)
			.insert(newVenown)
			.then(cb, cbe);
	}, cbe);
};
exports.updateById = function(venown, cb, cbe)
{
	var newUser = db.user.normalise(venown);
	var newVenown = exports.normalise(venown);
	db.user.updateById(newUser, function(id)
	{
		db.connection(table)
			.where('uid', id)
			.update(newVenown)
			.then(cb, cbe);
	}, cbe);
};

exports.delById = function(id, cb, cbe)
{
	db.connection(table)
		.where('uid', id)
		.del()
		.then(function(){
			db.user.delById(id, cb, cbe);
		}, cbe);
};

exports.normalise = function(venown, keep)
{
	keep = keep || false;
	var newVenown = {
		uid: venown.uid,
		email: venown.email,
		namef: venown.namef,
		namel: venown.namel,
		nameu: venown.nameu,
		phone: venown.phone,
		address: venown.address
	};
	
	if(venown.pass)
	{
		newVenown.passh = auth.hash(venown.pass);
	}
	else if(venown.passh)
	{
		newVenown.passh = venown.passh;
	}
	
	if(!keep)
	{
		delete newVenown.uid;
		delete newVenown.email;
		delete newVenown.passh;
		delete newVenown.namef;
		delete newVenown.namel;
	}
	
	for(var i in newVenown)
	{
		if(newVenown[i] === undefined)
		{
			delete newVenown[i];
		}
	}
	return newVenown;
};