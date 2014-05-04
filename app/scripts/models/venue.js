/*global define*/

define([
	'underscore',
	'backbone',
	'models/user'
], function (_, Backbone, UserModel) {
	'use strict';
	var VenueModel = UserModel.extend({
		urlRoot: '/api/venue',
		/*url: function(){
			if(this.isNew()) return this.urlRoot;
			return this.urlRoot+'/'+this.id;
		},*/
		initialize: function(attrs) {
			console.log('init venue');
			if(attrs)
			{
				this.id = attrs.vid;
			}
		},
		defaults: {
			//vid: null,
			name: null,
			type: null,
			address: null,
			description: null,
			owner: null
		},
		validate: function(attrs, options) {
		},
		parse: function(response, options)  {
			return response;
		}
	});
	return VenueModel;
});
