#!/usr/bin/env node

var host = '127.0.0.1';
var port = process.env.PORT||9000;

var env = process.env.NODE_ENV || 'development';

var db = {
	host: 'localhost',
	user: 'node',
	password: 'guest',
	database: 'quorum',
	charset: 'utf8'
};

var quorum = require('./quorum');

var path = require('path');

var express = require('express'),
		morgan = require('morgan'),
		bodyParser = require('body-parser'),
		cookieParser = require('cookies'),
		methodOverride = require('method-override');

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

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
app.use(cookieParser.express());
app.use(methodOverride());

if('development' == env)
{
	app.use(morgan('dev'));
	app.use(express.static(path.resolve('.tmp')));
	app.use(express.static(path.resolve('app')));
}
else if('production' == env)
{
	app.use(morgan());
	app.use(express.static(path.resolve('dist')));
}

router.route('/user')
	.get(quorum.rest.user.get)
	.post(quorum.rest.user.post)
	.put(quorum.rest.user.put)
	.delete(quorum.stub);
router.route('/user/:id')
	.get(quorum.rest.user.id.get)
	.post(quorum.stub)
	.put(quorum.rest.updateUserById)
	.delete(quorum.rest.user.id.del);
router.route('/user/:id/event')
	//.get(quorum.rest.user.event.get)
	.get(quorum.stub)
	.post(quorum.stub)
	.put(quorum.stub)
	.delete(quorum.stub);
router.route('/member')
	.get(quorum.rest.member.get)
	.put(quorum.stub)
	.post(quorum.rest.member.post)
	.delete(quorum.stub);
router.route('/member/:id')
	.get(quorum.rest.member.id.get)
	.post(quorum.stub)
	.put(quorum.updateMemberByEmail)
	.delete(quorum.stub);
router.route('/venue')
	.get(quorum.stub)
	.post(quorum.stub)
	.put(quorum.stub)
	.delete(quorum.stub);
router.use(function(req, res)
{
	res.json(404, {error:404});
});

app.post('/login/user', quorum.auth.userToken)
app.use('/api', expressJwt({secret: quorum.auth.secret}));
app.use('/api', router);

// 404
app.use(function(req, res)
{
	res.status(404).sendfile('app/index.html');
});
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
