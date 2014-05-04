/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/member.ejs'
], function ($, _, Backbone, TemplateText) {
	'use strict';
	var UserView = Backbone.View.extend({
		template: _.template(TemplateText),
		events: {
			'click .btn': 'change'
		},
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},
		render: function () {
			this.$el.html(this.template(this.model));
			return this;
		},
		change: function(el) {
			console.log('helli');
			console.log(el, this.model);
			this.test();
		}
	});
	return UserView;
});
