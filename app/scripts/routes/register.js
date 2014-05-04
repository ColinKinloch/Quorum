/*global define*/

define([
	'jquery',
	'backbone',
	'views/register/member',
	'views/register/venown',
	'text!templates/pages/register/member.ejs',
	'text!templates/pages/register/comsub.ejs'
], function ($, Backbone, RegMemView, RegVenownView, RegMemTemplate, RegComSubTemplate) {
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
			'register/venown': 'venown'
		},
		member: function() {
			menuSet('#register-member-but');
			var regMemView = new RegMemView({el: '#main'});
			//$(this.el).html(_.template(RegMemView));
		},
		comsub: function() {
			menuSet('#register-comsub-but');
			$(this.el).html(_.template(RegComSubTemplate));
		},
		venown: function() {
			menuSet('#register-venown-but');
			var regVenownView = new RegVenownView({el: '#main'});
			//$(this.el).html(_.template(RegVenOwnTemplate));
		}
	});
	return AdminRouter;
});
