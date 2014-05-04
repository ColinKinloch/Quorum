'use strict';
var db = require('../db');
var auth = require('../auth');
var table = 'commsub';
exports.table = table;

exports.getAll = function(cb, cbe)
{
	db.connection(table)
		.join('user', 'user.uid', '=', table+'.uid')
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', table+'.nameu', table+'.company')
		.then(cb, cbe);
};
exports.getById = function(id, cb, cbe)
{
	db.connection(table)
		.join('user', 'user.uid', '=', table+'.uid')
		.where('user.uid', id)
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', table+'.nameu', table+'.company')
		.then(cb, cbe);
};
exports.getByEmail = function(email, cb, cbe)
{
	db.connection(table)
		.join('user', 'user.uid', '=', table+'.uid')
		.where('user.email', email)
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', table+'.nameu', table+'.company')
		.then(cb, cbe);
};
exports.add = function(comsub, cb, cbe)
{
	var newUser = db.user.normalise(comsub);
	var newComsub = exports.normalise(comsub);
	
	db.user.add(newUser, function(id){
		newComsub.uid = id;
		db.connection(table)
			.insert(newComsub)
			.then(cb, cbe);
	}, cbe);
};
exports.updateById = function(comsub, cb, cbe)
{
	var newUser = db.user.normalise(comsub);
	var newComsub = exports.normalise(comsub);
	db.user.updateById(newUser, function(id)
	{
		db.connection(table)
			.where('uid', id)
			.update(newComsub)
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

exports.normalise = function(comsub, keep)
{
	keep = keep || false;
	var newComsub = {
		uid: comsub.uid,
		email: comsub.email,
		namef: comsub.namef,
		namel: comsub.namel,
		nameu: comsub.nameu,
		company: comsub.company
	};
	
	if(comsub.pass)
	{
		newComsub.passh = auth.hash(comsub.pass);
	}
	else if(comsub.passh)
	{
		newComsub.passh = comsub.passh;
	}
	
	if(!keep)
	{
		delete newComsub.uid;
		delete newComsub.email;
		delete newComsub.passh;
		delete newComsub.namef;
		delete newComsub.namel;
	}
	
	for(var i in newComsub)
	{
		if(newComsub[i] === undefined)
		{
			delete newComsub[i];
		}
	}
	return newComsub;
};