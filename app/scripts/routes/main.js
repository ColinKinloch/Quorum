/*global define*/

define([
	'jquery',
	'backbone',
	'collections/user',
	'views/usercollection',
	'text!templates/pages/search.ejs',
	'text!templates/pages/home.ejs',
	'text!templates/pages/user.ejs'
], function ($, Backbone, UserCollection, UserCollectionView, SearchTemplate, HomeTemplate, UserTemplate) {
	'use strict';
	
	var menuSet = function(el)
	{
		$('.header .nav li').removeClass('active');
		$('.header .nav '+el).addClass('active');
	}
	
	var MainRouter = Backbone.Router.extend({
		el: '#main',
		routes: {
			'': 'home',
			'login': 'login',
			'user': 'user'
		},
		home: function() {
			menuSet('#home-but');
			$(this.el).html(_.template(HomeTemplate));
			$("#search-container").html(_.template(SearchTemplate));
			console.log('hi');
		},
		login: function() {
			menuSet('#login-but');
			
		},
		user: function() {
			menuSet('#user-but');
			$(this.el).html(_.template(UserTemplate));
			var users = new UserCollection();
			var usersView = new UserCollectionView({collection: users, el: '#user-table tbody'});
			users.fetch();
		}
	});
	return MainRouter;
});
