/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/user.ejs'
], function ($, _, Backbone, UserTemp) {
	'use strict';
	var UserView = Backbone.View.extend({
		template: _.template(UserTemp),
		tagName: 'li',
		className: 'user-list',
		events: {},
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},
		render: function () {
			this.$el.html(this.template({users:this.model.toJSON()}));
			return this;
		}
	});
	return UserView;
});
