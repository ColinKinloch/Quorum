/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/user.ejs'
], function ($, _, Backbone, TemplateText) {
	'use strict';
	var UserView = Backbone.View.extend({
		template: _.template(TemplateText),
		tagName: 'tr',
		events: {
			'input input': 'change'
		},
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		change: function(el) {
			console.log(el, this.model);
		}
	});
	return UserView;
});
