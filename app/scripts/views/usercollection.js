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
		events: {
			'click #userInputAdd': 'addUser',
			'click .deleteUser': 'deleteUser',
			'click #userInputCommit': 'syncUsers',
			'click #userInputCancel': 'fetchUsers'
		},
		initialize: function () {
			var that = this;
			this._userViews = [];
			this.collection.each(function(user) {
				that._userViews.push(new UserView({model: user}))
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
			_(this._userViews).each(function(view) {
				//that.$el.append(view.render().el);
				temp.append(view.render().el);
			})
			this.$el.html(this.template({users:temp.html()}));
			//this.$el.html(this.template(this.collection.toJSON()));
		},
		add: function () {
			var that = this;
			this._userViews = [];
			this.collection.each(function(user) {
				that._userViews.push(new UserView({model: user}))
			});
		},
		syncUsers: function() {
			console.log('syncing!');
			this.collection.forEach(function(model){
				if(model.hasChanged())
				{
					model.save();
					console.log('Saving changes to', model);
				}
			});
		},
		fetchUsers: function() {
			console.log('fetching!');
			this.collection.reset();
			this.collection.fetch();
		},
		addUser: function(el) {
			console.log('hello');
			console.log(el, this.collection);
			var attrs = {
				email: $('#userInputEmail').val(),
				namef: $('#userInputNameF').val(),
				namel: $('#userInputNameL').val(),
				pass: $('#userInputPass').val()
			}
			this.collection.add(new this.collection.model(attrs,{validate:true}));
			console.log('added user to collection');
			this.add();
		},
		deleteUser: function(e) {
			var id = $(e.currentTarget).parent().parent().data('id');
			this.collection.get(id).destroy();
			//this.collection.remove(id);
			console.log('deleted user from collection', id);
		}
	});
	return UserCollectionView;
});
