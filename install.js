#!/usr/bin/env node
console.log('Quorum post-install scripts!');

var fs = require('fs');
var prompt = require('prompt');
var mysql = require('mysql');

console.log('Setting up SQL server');
prompt.message = "Quorum";

prompt.start();

prompt.get({
	properties: {
		skip: {
			message: "Initialize database?",
			validator: /y[es]*|n[o]?/,
			default: 'yes'
		}
	}
}, function(err, result) {
	if(result.skip === 'yes')
	{
		console.log('I won\'t start your RDBM for you!');
		prompt.get(
		{
			properties:
			{
				host:
				{
					description: "SQL Hostname",
					default: 'localhost'
				},
				user:
				{
					description: "SQL Username",
					default: 'root'
				},
				pass:
				{
					description: "SQL Password",
					hidden: true,
					default: ''
				}
			}
		},
		function(err, result)
		{
			createTables(result.host, result.user, result.pass);
		});
	}
	else
	{
		console.log('I will not touch your RDBM, don\'t worry.');
	}
});

function createTables(host, user, pass)
{
	var conn = mysql.createConnection(
	{
		host: host,
		user: user,
		pass: pass,
		multipleStatements: true
	});
	conn.connect(function(err)
	{
		if(err) throw err;
		else console.log('Connection to', host, 'acquired ');
	});
	
	//Do SQL here
	loadQueries().forEach(function(query){
		//console.log('running:\n', query);
		conn.query(query, function(err)
		{
			if(err)
			{
				console.log('Problem is in:\n', query);
				if(err) throw err;
			}
		});
	});
	
	
	conn.end(function(err)
	{
		if(err) throw err;
		else console.log('Connection to', host, 'terminated');
		console.log('Your mysql server has successfully been set up!');
	});
	
}

function loadQueries()
{
	var order = [
		/^create_database_/i,
		/^create_table_/i,
		/^create_/i,
		/^constrain_/i
		];
	var filenames = [];
	var queries = [];
	var dir = __dirname + '/sql/';
	var files = fs.readdirSync(dir);
	order.forEach(function(re){
		var added = [];
		//Add files that match current regex
		files.forEach(function(file, index){
			if(file.match(re))
			{
				filenames.push(file);
				added.push(index);
				queries.push(fs.readFileSync(dir+file, {encoding: 'utf8'}));
			}
		});
		//Remove added files in reverse order
		added.reverse();
		added.forEach(function(index){
			files.splice(index,1);
		})
	});
	
	console.log('sql command order:\n', filenames);
	
	return queries;
}