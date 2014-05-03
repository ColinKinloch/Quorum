/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'auth',
	'text!templates/pages/login.ejs',
], function ($, _, Backbone, Auth, TemplateText) {
	'use strict';
	var UserView = Backbone.View.extend({
		template: _.template(TemplateText),
		events: {
			'click #userLoginSubmit': 'login'
		},
		initialize: function () {
			this.render();
			//this.listenTo(this.model, 'change', this.render);
		},
		render: function () {
			this.$el.html(this.template({message: undefined}));
		},
		change: function(el) {
			console.log('helli');
			console.log(el, this.model);
			this.test();
		},
		login: function() {
			console.log('hi');
			localStorage.setItem('email', $('#userLoginEmail').val());
			localStorage.setItem('password', $('#userLoginPassword').val());
			Auth.setAuthToken();
		}
	});
	return UserView;
});
