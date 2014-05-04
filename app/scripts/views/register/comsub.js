/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/comsub',
	'text!templates/pages/register/comsub.ejs',
], function ($, _, Backbone, ComsubModel, TemplateText) {
	'use strict';
	var RegComsubView = Backbone.View.extend({
		template: _.template(TemplateText),
		events: {
			'click #comsubRegisterSubmit': 'register'
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
			console.log('Registering new commercial subscriber');
			var comsubData =
			{
				email: $('#comsubRegisterEmail').val(),
				pass: $('#comsubRegisterPassword').val(),
				namef: $('#comsubRegisterNameF').val(),
				namel: $('#comsubRegisterNameL').val(),
				nameu: $('#comsubRegisterUsername').val(),
				company: $('#comsubRegisterCompany').val()
			};
			var comsub = new ComsubModel(comsubData, {url:'/api/comsub'});
			console.log(comsub);
			Backbone.sync('create', comsub);
		}
	});
	return RegComsubView;
});
