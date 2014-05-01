/*global define*/

define([
	'underscore',
	'backbone',
	'models/user'
], function (_, Backbone, UserModel) {
	'use strict';
	var MemberModel = UserModel.extend({
		url: '',
		initialize: function() {
		},
		defaults: {
			nameu: null,
			gold: null
		},
		validate: function(attrs, options) {
		},
		parse: function(response, options)  {
			return response;
		}
	});
	return MemberModel;
});
