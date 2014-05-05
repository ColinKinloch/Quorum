/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'text!app/scripts/templates/eventPanel.ejs'
], function ($, _, Backbone, Template) {
	'use strict';

	var EventPanelView = Backbone.View.extend({
		template: _.template(Template),

		tagName: 'div',

		id: '',

		className: '',

		events: {},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		}
	});

	return EventPanelView;
});
