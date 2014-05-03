/*global define*/

define([
	'jquery',
	'backbone'
], function ($, Backbone) {
	'use strict';
	var AdminRouter = Backbone.Router.extend({
		el:'#main',
		routes: {
			'admin': 'admin'
		},
		admin: function() {
			$(this.el).html('<h1>HELLO GUY!</h1>');
		}
	});
	return AdminRouter;
});
