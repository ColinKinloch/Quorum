//Use this eventually, create a server
var express = require('express');

var auth = require('./lib/auth');
var db = require('./lib/db');
var rest = require('./lib/rest');
exports.auth = auth;
exports.db = db;
exports.rest = rest;

exports.getUserByEmail = function(req, res)
{
	db.user.getByEmail(req.params.email,
		function(rows)
		{
			console.log('By email,', req.params.email, ':\n', rows);
			res.json(rows);
		},
		function(err)
		{
			console.error(err);
			res.json(err);
		}
	);
}

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
			res.json(err);
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
}

exports.updateMemberByEmail = function(req, res)
{
	res.send('phych!');
}

exports.stub = function(req, res)
{
	res.json(501, {error: 501, TODO: 'this'});
};