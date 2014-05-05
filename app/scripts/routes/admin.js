/*global define*/

define([
	'jquery',
	'backbone',
	'collections/user',
	'collections/member',
	'views/table/usercollection',
	'views/table/membercollection',
	'text!templates/pages/user.ejs'
], function ($, Backbone, UserCollection, MemberCollection, UserCollectionView, MemberCollectionView, UserTemplate) {
	'use strict';
	
	var menuSet = function(el)
	{
		$('.header .nav li').removeClass('active');
		$('.header .nav '+el).addClass('active');
	};
	
	var AdminRouter = Backbone.Router.extend({
		el:'#main',
		routes: {
			'admin/user': 'user',
			'admin/member': 'member'
		},
		user: function() {
			menuSet('#admin-user-but');
			$(this.el).html(_.template(UserTemplate));
			var users = new UserCollection();
			var usersView = new UserCollectionView({collection: users, el: '#user-table'});
			users.fetch();
		},
		member: function() {
			menuSet('#admin-user-but');
			$(this.el).html(_.template(UserTemplate));
			var users = new MemberCollection();
			var membersView = new MemberCollectionView({collection: users, el: '#user-table'});
			users.fetch();
		}
	});
	return AdminRouter;
});
