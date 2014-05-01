/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'views/user',
	'text!templates/usercollection.ejs'
], function ($, _, Backbone, UserView, TemplateText) {
	'use strict';
	var UserCollectionView = Backbone.View.extend({
		template: _.template(TemplateText),
		tagName: 'table',
		//id: 'user-table',
		className: 'table striped',
		initialize: function () {
			var that = this;
			this._userViews = [];
			this.collection.each(function(user) {
				that._userViews.push(new UserView({model: user}))
			});
			
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'add', this.add);
		},
		render: function () {
			var that = this;
			this.$el.empty();
			_(this._userViews).each(function(view) {
				that.$el.append(view.render().el);
			})
			//this.$el.html(this.template(this.collection.toJSON()));
		},
		add: function () {
			var that = this;
			this._userViews = [];
			this.collection.each(function(user) {
				that._userViews.push(new UserView({model: user}))
			});
		}
	});
	return UserCollectionView;
});
