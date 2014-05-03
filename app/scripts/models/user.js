/*global define*/

define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';
	var UserModel = Backbone.Model.extend({
		urlRoot: '/api/user',
		initialize: function(attrs) {
			console.log('init user')
			if(attrs)
			{
				this.id = attrs.uid;
			}
		},
		defaults: {
			//uid: undefined,
			email: undefined,
			namef: undefined,
			namel: undefined
		},
		validate: function(attrs, options) {
			var emailValid = /.+@.+/;
			if(!emailValid.test(attrs.email))
			{
				console.log('invalid email', attrs.email);
				return 'invalid email';
			}
		},
		parse: function(response, options)  {
			return response;
		}
	});
	return UserModel;
});
