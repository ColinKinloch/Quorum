'use strict';
var db = require('./db');

var user = require('./rest/user');
var member = require('./rest/member');
var venown = require('./rest/venown');
var eventRest = require('./rest/event');

exports.user = user;
exports.member = member;
exports.venown = venown;
exports.event = eventRest;

exports.getAllMembers = function(req, res)
{
	db.member.getAll(
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

exports.getMemberByEmail = function(req, res)
{
	db.member.getByEmail(req.params.email,
		function(rows)
		{
			console.log('member by email,', req.params.email, ':\n', rows);
			res.json(rows);
		},
		function(err)
		{
			console.error(err);
			res.json(500, err);
		}
	);
	/*
	db.connection.query('SELECT uid, email, namef, namel FROM member WHERE email = ?',
		[req.params.email],
		function(err, rows)
		{
			console.log(req.params.email, rows);
			res.json(rows);
		}
	);*/
};