/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/member',
	'text!templates/pages/register/member.ejs',
], function ($, _, Backbone, MemberModel, TemplateText) {
	'use strict';
	var UserView = Backbone.View.extend({
		template: _.template(TemplateText),
		events: {
			'click #memberRegisterSubmit': 'register'
		},
		initialize: function () {
			this.render();
			//this.listenTo(this.model, 'change', this.render);
		},
		render: function () {
			this.$el.html(this.template({message: undefined}));
		},
		change: function(el) {
			console.log('helli');
			console.log(el, this.model);
			this.test();
		},
		register: function() {
			console.log('Registering new member');
			var memberData =
			{
				nameu:$('#memberRegisterUsername').val(),
				email:$('#memberRegisterEmail').val(),
				pass:$('#memberRegisterPassword').val(),
				namef:$('#memberRegisterNameF').val(),
				namel:$('#memberRegisterNameL').val(),
				gold:$('#memberRegisterGold').prop('checked')
			};
			var member = new MemberModel(memberData, {url:'/api/member'});
			console.log(member);
			Backbone.sync('create', member);
		}
	});
	return UserView;
});
