/*global define*/

define([
	'jquery',
	'backbone',
	'views/register/member',
	'text!templates/pages/register/member.ejs',
	'text!templates/pages/register/comsub.ejs',
	'text!templates/pages/register/venown.ejs'
], function ($, Backbone, RegMemView, RegMemTemplate, RegComSubTemplate, RegVenOwnTemplate) {
	'use strict';
	var AdminRouter = Backbone.Router.extend({
		el:'#main',
		routes: {
			'register/member': 'registerMember',
			'register/comsub': 'registerComSub',
			'register/venown': 'registerVenOwn'
		},
		registerMember: function() {
			var regMemView = new RegMemView({el: '#main'});
			//$(this.el).html(_.template(RegMemView));
		},
		registerComSub: function() {
			$(this.el).html(_.template(RegComSubTemplate));
		},
		registerVenOwn: function() {
			$(this.el).html(_.template(RegVenOwnTemplate));
		}
	});
	return AdminRouter;
});
