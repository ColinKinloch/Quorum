/*global define*/

define([
	'underscore',
	'backbone',
	'models/user'
], function (_, Backbone, UserModel) {
	'use strict';
	var MemberModel = UserModel.extend({
		urlRoot: '/api/member',
		initialize: function(attrs) {
			console.log('init member');
			if(attrs)
			{
				this.id = attrs.uid;
			}
		},
		defaults: {
			nameu: null,
			gold: null
		},
		parse: function(response, options)  {
			return response;
		}
	});
	return MemberModel;
});
