/*global define*/

define([
	'jquery',
	'backbone',
	'collections/user',
	'collections/member',
	'collections/comsub',
	'collections/venown',
	'views/table/usercollection',
	'views/table/membercollection',
	'views/table/comsubcollection',
	'views/table/venowncollection',
	'text!templates/pages/user.ejs'
], function ($, Backbone, UserCollection, MemberCollection, ComsubCollection, VenownCollection, UserCollectionView, MemberCollectionView, ComsubCollectionView, VenownCollectionView, UserTemplate) {
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
			'admin/member': 'member',
			'admin/comsub': 'comsub',
			'admin/venown': 'venown'
		},
		user: function() {
			menuSet('#admin-user-but');
			$(this.el).html(_.template(UserTemplate));
			var users = new UserCollection();
			var usersView = new UserCollectionView({collection: users, el: '#user-table'});
			users.fetch();
		},
		member: function() {
			menuSet('#admin-member-but');
			$(this.el).html(_.template(UserTemplate));
			var members = new MemberCollection();
			var membersView = new MemberCollectionView({collection: members, el: '#user-table'});
			members.fetch();
		},
		comsub: function() {
			menuSet('#admin-comsub-but');
			$(this.el).html(_.template(UserTemplate));
			var comsub = new ComsubCollection();
			var comsubView = new ComsubCollectionView({collection: comsub, el: '#user-table'});
			comsub.fetch();
		},
		venown: function() {
			menuSet('#admin-comsub-but');
			$(this.el).html(_.template(UserTemplate));
			var venown = new VenownCollection();
			var venownView = new VenownCollectionView({collection: venown, el: '#user-table'});
			venown.fetch();
		}
	});
	return AdminRouter;
});
