/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	//'text!templates/option',
	'text!templates/option.ejs'
], function ($, _, Backbone, OptionTemplate) {
	'use strict';
	var VenueSelectView = Backbone.View.extend({
		//template: _.template(TemplateText),
		tagName: 'select',
		//id: 'user-table',
		className: 'form-control',
		events: {
		},
		initialize: function () {
			var that = this;
			this._venueViews = [];
			this.collection.each(function(venue) {
				that._venueViews.push(_template(OptionTemplate, venue))
			});
			
			this.listenTo(this.collection, 'add', this.add);
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'remove', this.add);
			this.listenTo(this.collection, 'remove', this.render);
			this.listenTo(this.collection, 'fetchUsers', this.add);
			this.listenTo(this.collection, 'fetchUsers', this.render);
			this.listenTo(this.collection, 'syncUsers', this.add);
			this.listenTo(this.collection, 'syncUsers', this.render);
		},
		render: function () {
			//var that = this;
			var temp = $('<div>');
			//this.$el.empty();
			//temp.empty();
			_(this._venueViews).each(function(view) {
				//that.$el.append(view.render().el);
				temp.append(view);
			})
			
			console.log(temp.html());
			this.$el.html(temp.html());
			//this.$el.html(this.template(this.collection.toJSON()));
		},
		add: function () {
			var that = this;
			this._venueViews = [];
			this.collection.each(function(venue) {
				that._venueViews.push(_.template(OptionTemplate, venue));
			});
		}
	});
	return VenueSelectView;
});
