/*global define*/

define([
	'underscore',
	'backbone',
	'models/event'
], function (_, Backbone, EventModel) {
	'use strict';
	var EventCollection = Backbone.Collection.extend({
		model: EventModel,
		url: '/api/event'
	});
	return EventCollection;
});
