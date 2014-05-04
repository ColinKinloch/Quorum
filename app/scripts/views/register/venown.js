/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/venown',
	'text!templates/pages/register/venown.ejs',
], function ($, _, Backbone, VenownModel, TemplateText) {
	'use strict';
	var RegVenownView = Backbone.View.extend({
		template: _.template(TemplateText),
		events: {
			'click #venownRegisterSubmit': 'register'
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
			console.log('Registering new venue owner');
			var venownData =
			{
				email:$('#venownRegisterEmail').val(),
				pass:$('#venownRegisterPassword').val(),
				namef:$('#venownRegisterNameF').val(),
				namel:$('#venownRegisterNameL').val(),
				nameu:$('#venownRegisterUsername').val(),
				phone:$('#venownRegisterPhone').val(),
				address:$('#venownRegisterAddress').val()
			};
			var venown = new VenownModel(venownData, {url:'/api/venown'});
			console.log(venown);
			Backbone.sync('create', venown);
		}
	});
	return RegVenownView;
});
