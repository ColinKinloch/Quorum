/*global define*/

define([
	'jquery',
	'backbone',
	'collections/user',
	'views/table/usercollection',
	'text!templates/pages/user.ejs'
], function ($, Backbone, UserCollection, UserCollectionView, UserTemplate) {
	'use strict';
	
	var menuSet = function(el)
	{
		$('.header .nav li').removeClass('active');
		$('.header .nav '+el).addClass('active');
	};
	
	var AdminRouter = Backbone.Router.extend({
		el:'#main',
		routes: {
			'admin/user': 'user'
		},
		user: function() {
			menuSet('#admin-user-but');
			$(this.el).html(_.template(UserTemplate));
			var users = new UserCollection();
			var usersView = new UserCollectionView({collection: users, el: '#user-table'});
			users.fetch();
		}
	});
	return AdminRouter;
});
