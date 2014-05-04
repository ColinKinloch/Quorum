/*global define*/

define([
	'jquery',
	'backbone',
	'views/register/member',
	'views/register/venown',
	'views/register/comsub',
	'views/register/venue',
	'views/register/event'
], function ($, Backbone, RegMemView, RegVenownView, RegComsubView, RegVenueView, RegEventView) {
	'use strict';
	
	var menuSet = function(el)
	{
		$('.header .nav li').removeClass('active');
		$('.header .nav '+el).addClass('active');
	};
	
	var AdminRouter = Backbone.Router.extend({
		el:'#main',
		routes: {
			'register/member': 'member',
			'register/comsub': 'comsub',
			'register/venown': 'venown',
			'register/venue': 'venue',
			'register/event': 'event'
		},
		member: function() {
			menuSet('#register-member-but');
			var regMemView = new RegMemView({el: '#main'});
			//$(this.el).html(_.template(RegMemView));
		},
		comsub: function() {
			menuSet('#register-comsub-but');
			var regComsubView = new RegComsubView({el: '#main'});
			//$(this.el).html(_.template(RegComSubTemplate));
		},
		venown: function() {
			menuSet('#register-venown-but');
			var regVenownView = new RegVenownView({el: '#main'});
			//$(this.el).html(_.template(RegVenOwnTemplate));
		},
		venue: function() {
			menuSet('#register-venue-but');
			var regVenueView = new RegVenueView({el: '#main'});
		},
		event: function() {
			menuSet('#register-event-but');
			var regEventView = new RegEventView({el: '#main'});
		}
	});
	return AdminRouter;
});
