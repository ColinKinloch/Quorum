/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/event',
	'collections/venue',
	'text!templates/pages/register/event.ejs',
	'views/venueSelect'
], function ($, _, Backbone, EventModel, VenueCollection, TemplateText, VenueSelect) {
	'use strict';
	var RegEventView = Backbone.View.extend({
		template: _.template(TemplateText),
		events: {
			'click #eventRegisterSubmit': 'register'
		},
		initialize: function () {
			this.venueCollection = new VenueCollection();
			this._venueSelect = new VenueSelect({id: 'eventRegisterVenue', collection: this.venueCollection});
			this.venueCollection.fetch();
			this.render();
			
			this.listenTo(this.venueCollection, 'add', this.render);
		},
		render: function () {
			console.log('render View');
			this.$el.html(this.template({venueSelect: this._venueSelect.$el.html(), message: undefined}));
		},
		change: function(el) {
			console.log(el, this.model);
			this.test();
		},
		register: function() {
			console.log('Registering new event');
			var eventData =
			{
				name: $('#eventRegisterName').val(),
				type: $('#eventRegisterType').val(),
				description: $('#eventRegisterDescription').val(),
				starttime: $('#eventRegisterStartTime').val(),
				endtime: $('#eventRegisterEndTime').val(),
				capacity: $('#eventRegisterCapacity').val(),
				venue: $('#eventRegisterVenue').val(),
				owner: localStorage.getItem('uid')
			};
			
			var newEvent = new EventModel(eventData, {url:'/api/event'});
			console.log(newEvent);
			Backbone.sync('create', newEvent);
			Backbone.history.navigate('', {trigger: true});
		}
	});
	return RegEventView;
});
