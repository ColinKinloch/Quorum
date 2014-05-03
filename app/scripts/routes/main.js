/*global define*/

define([
	'jquery',
	'backbone',
	'routes/admin',
	'collections/user',
	'views/usercollection',
	'views/login',
	'text!templates/search.ejs',
	'text!templates/pages/home.ejs',
	'text!templates/pages/login.ejs',
	'text!templates/pages/404.ejs',
	'text!templates/pages/user.ejs'
], function ($, Backbone, AdminRouter, UserCollection, UserCollectionView, LoginView, SearchTemplate, HomeTemplate, LoginTemplate, MissingTemplate, UserTemplate) {
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
			'logout': 'logout',
			'user': 'user',
			'*notFound': 'notFound'
		},
		home: function() {
			menuSet('#home-but');
			$(this.el).html(_.template(HomeTemplate));
			$("#search-container").html(_.template(SearchTemplate));
			console.log('hi');
		},
		login: function() {
			menuSet('#login-but');
			var loginView = new LoginView({el: '#main'});
			//$(this.el).html(_.template(LoginTemplate, {message: undefined}));
		},
		logout: function() {
			localStorage.removeItem('token');
			localStorage.removeItem('password');
			localStorage.removeItem('email');
			this.navigate('/');
		},
		user: function() {
			menuSet('#user-but');
			$(this.el).html(_.template(UserTemplate));
			var users = new UserCollection();
			var usersView = new UserCollectionView({collection: users, el: '#user-table'});
			users.fetch();
		},
		notFound: function(page) {
			$(this.el).html(_.template(MissingTemplate, {page: document.location.origin+'/'+page}));
		}
	});
	return MainRouter;
});
