/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/venue',
	'text!templates/pages/register/venue.ejs',
], function ($, _, Backbone, VenueModel, TemplateText) {
	'use strict';
	var RegVenueView = Backbone.View.extend({
		template: _.template(TemplateText),
		events: {
			'click #venueRegisterSubmit': 'register'
		},
		initialize: function () {
			this.render();
			//this.listenTo(this.model, 'change', this.render);
		},
		render: function () {
			this.$el.html(this.template({message: undefined}));
		},
		change: function(el) {
			console.log(el, this.model);
			this.test();
		},
		register: function() {
			console.log('Registering new venue');
			var venueData =
			{
				name: $('#venueRegisterName').val(),
				type: $('#venueRegisterType').val(),
				address: $('#venueRegisterAddress').val(),
				description: $('#venueRegisterDescription').val(),
				owner: localStorage.getItem('uid')
			};
			var venue = new VenueModel(venueData, {url:'/api/venue'});
			console.log(venue);
			Backbone.sync('create', venue);
		}
	});
	return RegVenueView;
});
