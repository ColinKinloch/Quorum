/*global define*/

define([
	'jquery',
	'backbone',
	'text!templates/pages/registermember.ejs',
	'text!templates/pages/registercomsub.ejs',
	'text!templates/pages/registervenown.ejs'
], function ($, Backbone, RegMemTemplate, RegComSubTemplate, RegVenOwnTemplate) {
	'use strict';
	var AdminRouter = Backbone.Router.extend({
		el:'#main',
		routes: {
			'register/member': 'registerMember',
			'register/comsub': 'registerComSub',
			'register/venown': 'registerVenOwn'
		},
		registerMember: function() {
			$(this.el).html(_.template(RegMemTemplate));
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
