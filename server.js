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
var publicRouter = express.Router();
var memberRouter = express.Router();
var adminRouter = express.Router();

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

publicRouter.route('/user')
	.post(quorum.rest.user.create);
publicRouter.route('/member')
	.post(quorum.rest.member.create);
publicRouter.route('/venown')
	.post(quorum.rest.venown.create);
publicRouter.route('/comsub')
	.post(quorum.rest.comsub.create);
publicRouter.route('/venue')
	.get(quorum.rest.venue.read);
publicRouter.route('/event')
	.get(quorum.rest.event.query)

memberRouter.route('/user')
	.get(quorum.rest.user.read)
	.put(quorum.rest.user.update)
	.delete(quorum.stub);
memberRouter.route('/user/:id')
	.get(quorum.rest.user.id.read)
	.post(quorum.stub)
	.put(quorum.rest.user.id.update)
	.delete(quorum.rest.user.id.delete);
memberRouter.route('/user/:id/event')
	//.get(quorum.rest.user.event.get)
	.post(quorum.stub)
	.get(quorum.stub)
	.put(quorum.stub)
	.delete(quorum.stub);
memberRouter.route('/member')
	.get(quorum.rest.member.read)
	.put(quorum.stub)
	.delete(quorum.stub);
memberRouter.route('/member/:id')
	.get(quorum.rest.member.id.read)
	.post(quorum.stub)
	.put(quorum.rest.member.id.update)
	.delete(quorum.rest.member.id.delete);
memberRouter.route('/venue')
	.post(quorum.rest.venue.create)
	.put(quorum.stub)
	.delete(quorum.stub);
memberRouter.route('/event')
	.post(quorum.rest.event.create)
	.put(quorum.stub)
	.delete(quorum.stub);


app.post('/login/user', quorum.auth.userToken)
app.use('/api', publicRouter);
app.use('/api', expressJwt({audience:'member', secret: quorum.auth.secret}));
app.use('/api', memberRouter);
app.use('/api', expressJwt({audience:'admin', secret: quorum.auth.secret}));
app.use('/api', adminRouter);
app.use('/api', function(req, res)
	{
		res.json(404, {error:404});
	});

// 404
app.use(function(req, res)
{
	res.status(404).sendfile('app/index.html');
});
app.listen(port, host, function(){
	console.log('Quorum server listening at:', host+':'+port);
	console.log('I suggest however you access the page via localhost:'+port)
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
