/*global define*/

define([
	'underscore',
	'backbone',
	'models/user'
], function (_, Backbone, UserModel) {
	'use strict';
	var MemberModel = UserModel.extend({
		urlRoot: '/api/member',
		/*url: function(){
			if(this.isNew()) return this.urlRoot;
			return this.urlRoot+'/'+this.id;
		},*/
		initialize: function(attrs) {
			console.log('init member');
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
