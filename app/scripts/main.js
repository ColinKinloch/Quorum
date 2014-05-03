/*global require*/
'use strict';


require.config({
	baseUrl: '//localhost:9000/scripts',
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		}
	},
	paths: {
		text: '../bower_components/requirejs-text/text',
		jquery: '../bower_components/jquery/dist/jquery',
		backbone: '../bower_components/backbone/backbone',
		underscore: '../bower_components/underscore/underscore',
		bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
	}
});

require([
	'jquery',
	'backbone',
	'routes/main',
	'routes/register',
	'routes/admin',
	'auth',
	'bootstrap'
], function ($, Backbone, MainRouter, RegisterRouter, AdminRouter) {
	Backbone.history.start({pushState: true});
	
	var router = new MainRouter();
	var registerRouter = new RegisterRouter();
	var adminRouter = new AdminRouter();
	
	Backbone.history.loadUrl(Backbone.history.fragment);
});
