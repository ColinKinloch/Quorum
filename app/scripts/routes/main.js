/*global define*/

define([
	'jquery',
	'backbone',
	'routes/admin',
	'collections/user',
	'views/table/usercollection',
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
	};
	
	var MainRouter = Backbone.Router.extend({
		el: '#main',
		routes: {
			'': 'home',
			'login': 'login',
			'logout': 'logout',
			'*notFound': 'notFound'
		},
		home: function() {
			menuSet('#home-but');
			$(this.el).html(_.template(HomeTemplate));
			$("#search-container").html(_.template(SearchTemplate));
			console.log('hi');
		},
		login: function() {
			menuSet('#log-in-but');
			var loginView = new LoginView({el: '#main'});
			//$(this.el).html(_.template(LoginTemplate, {message: undefined}));
		},
		logout: function() {
			localStorage.removeItem('token');
			localStorage.removeItem('password');
			localStorage.removeItem('email');
			this.navigate('', {trigger: true});
		},
		notFound: function(page) {
			$(this.el).html(_.template(MissingTemplate, {page: document.location.origin+'/'+page}));
		}
	});
	return MainRouter;
});
