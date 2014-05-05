/*global define*/

define([
	'underscore',
	'backbone',
	'models/user'
], function (_, Backbone, UserModel) {
	'use strict';
	var ComsubModel = UserModel.extend({
		urlRoot: '/api/comsub',
		initialize: function(attrs) {
			console.log('init comsub');
			if(attrs)
			{
				this.id = attrs.uid;
			}
		},
		defaults: {
			nameu: null,
			company: null,
		},
		validate: function(attrs, options) {
		},
		parse: function(response, options)  {
			return response;
		}
	});
	return ComsubModel;
});
