'use strict';
var db = require('../db');
var auth = require('../auth');

exports.getAll = function(cb, cbe)
{
	//SELECT user.uid, user.email, user.namef, user.namel, member.nameu, member.gold FROM member, user WHERE member.uid = user.uid
	db.connection('member')
		.join('user', 'user.uid', '=', 'member.uid')
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', 'member.nameu', 'member.gold')
		.then(cb, cbe);
};
exports.getById = function(id, cb, cbe)
{
	db.connection('member')
		.join('user', 'user.uid', '=', 'member.uid')
		.where('user.uid', id)
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', 'member.nameu', 'member.gold')
		.then(cb, cbe);
};
exports.getByEmail = function(email, cb, cbe)
{
	//SELECT user.uid, user.email, user.namef, user.namel, member.nameu, member.gold FROM member, user WHERE member.uid = user.uid AND user.email = [email]
	db.connection('member')
		.join('user', 'user.uid', '=', 'member.uid')
		.where('user.email', email)
		.select('user.uid', 'user.email', 'user.namef', 'user.namel', 'member.nameu', 'member.gold')
		.then(cb, cbe);
};
exports.add = function(member, cb, cbe)
{
	var newUser = db.user.normalise(member);
	var newMember = exports.normalise(member);
	
	db.user.add(newUser, function(id){
		//TODO determine whether id = uid
		newMember.uid = id;
		db.connection('member')
			.insert(newMember)
			.then(cb, cbe);
	}, cbe);
};
exports.updateById = function(member, cb, cbe)
{
	var newUser = db.user.normalise(member);
	var newMember = exports.normalise(member);
	db.user.updateById(newUser, function(id)
	{
		// UPDATE member SET [member] WHERE uid = [id]
		db.connection('member')
			.where('uid', id)
			.update(newMember)
			.then(cb, cbe);
	}, cbe);
};

exports.delById = function(id, cb, cbe)
{
	db.connection('member')
		.where('uid', id)
		.del()
		.then(function(){
			db.user.delById(id, cb, cbe);
		}, cbe);
};

exports.normalise = function(member, keep)
{
	keep = keep || false;
	var newMember = {
		uid: member.uid,
		email: member.email,
		namef: member.namef,
		namel: member.namel,
		nameu: member.nameu,
		gold: member.gold
	};
	
	if(member.pass)
	{
		newMember.passh = auth.hash(member.pass);
	}
	else if(member.passh)
	{
		newMember.passh = member.passh;
	}
	
	if(!keep)
	{
		delete newMember.uid;
		delete newMember.email;
		delete newMember.passh;
		delete newMember.namef;
		delete newMember.namel;
	}
	
	for(var i in newMember)
	{
		if(newMember[i] === undefined)
		{
			delete newMember[i];
		}
	}
	return newMember;
};