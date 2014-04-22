/*global require*/
'use strict';

require.config({
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
	'collections/user',
	'views/user'
], function ($, Backbone, UserCollection, UserView) {
	Backbone.history.start();
	
	var users = new UserCollection();
	var usersView = new UserView({model: users});
	
	$('#userlist').html(usersView.$el);
	
	users.fetch({success: function(){
		usersView.render();
	}});
	console.log(users);
});
