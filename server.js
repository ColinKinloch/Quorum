#!/usr/bin/env node

var host = '127.0.0.1';
var port = process.env.PORT||9000;

var db = {
	host: 'localhost',
	user: 'node',
	password: 'guest',
	database: 'quorum',
	charset: 'utf8'
};

var quorum = require('./quorum');

var express = require('express'),
		morgan = require('morgan'),
		bodyParser = require('body-parser');

var dbConn = quorum.db.createConnection(db);

/*
dbConn.connect(function(err)
{
	console.log(err || 'connected to DB.');
	//dbConn.query('USE quorum;');
});
*/

var app = express();
var router = express.Router();

app.use(bodyParser());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/.tmp'));
app.use(express.static(__dirname + '/app'));
router.route('/user')
	.get(quorum.rest.user.get)
	.post(quorum.rest.user.post)
router.route('/user/:id')
	.get(quorum.rest.user.id.get)
	.put(quorum.updateUserById);
router.route('/member')
	.get(quorum.rest.member.get)
	.post(quorum.rest.member.post);
router.route('/member/:id')
	.get(quorum.rest.member.id.get)
	.put(quorum.updateMemberByEmail);
//app.use('/add', quorum.getVerified.bind(null, 'colin@bum.com', 'garple', function(res){console.log('ver:', res)}));
//app.use(restApp.bodyParser());

app.use('/api', router);
app.listen(port, host, function(){
	console.log('Quorum server listening at:', host+':'+port);
});

//On close
process.on('exit', shutdown.bind(null, {signal: 'exit', cleanup: true}));
process.on('SIGINT', shutdown.bind(null, {signal: 'SIGINT', exit: true}));
function shutdown(opts)
{
	opts.signal = opts.signal || '?';
	opts.exit = opts.exit || false;
	opts.cleanup = opts.cleanup || false;
	
	console.log('Signal:', opts.signal);
	if(opts.exit) process.exit();
	
	if(opts.cleanup)
	{
		console.log('Quorum shutting down.');
		dbConn.end(function(err)
		{
			console.log(err || 'Connection to DB ended.');
		});
	}
}
