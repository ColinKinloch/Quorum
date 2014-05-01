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
	'collections/member',
	'views/usercollection'
], function ($, Backbone, MainRouter, UserCollection, UserCollectionView) {
	Backbone.history.start({pushState: true});
	
	var router = new MainRouter();
	
	Backbone.history.loadUrl(Backbone.history.fragment);
});
