/*global define*/

define([
	'underscore',
	'backbone',
	'models/user'
], function (_, Backbone, UserModel) {
	'use strict';
	var VenownModel = UserModel.extend({
		urlRoot: '/api/venown',
		/*url: function(){
			if(this.isNew()) return this.urlRoot;
			return this.urlRoot+'/'+this.id;
		},*/
		initialize: function(attrs) {
			console.log('init venown');
			if(attrs)
			{
				this.id = attrs.uid;
			}
		},
		defaults: {
			nameu: null,
			phone: null,
			address: null,
		},
		validate: function(attrs, options) {
		},
		parse: function(response, options)  {
			return response;
		}
	});
	return VenownModel;
});
