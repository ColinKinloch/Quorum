/*global define*/

define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';
	var UserModel = Backbone.Model.extend({
		urlRoot: '/api/user',
		initialize: function(attrs) {
			this.id = attrs.uid;
		},
		defaults: {
			uid: undefined,
			email: undefined,
			namef: undefined,
			namel: undefined
		},
		validate: function(attrs, options) {
		},
		parse: function(response, options)  {
			return response;
		}
	});
	return UserModel;
});
