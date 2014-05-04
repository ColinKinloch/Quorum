/*global define*/

define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';
	var EventModel = Backbone.Model.extend({
		urlRoot: '/api/event',
		initialize: function(attrs) {
			console.log('init event')
			if(attrs)
			{
				this.id = attrs.eid;
			}
		},
		defaults: {
			//eid: undefined,
			name: undefined,
			type: undefined,
			description: undefined,
			starttime: undefined,
			endtime: undefined,
			capacity: undefined,
			venue: undefined,
			owner: undefined
		},
		parse: function(response, options)  {
			return response;
		}
	});
	return EventModel;
});
