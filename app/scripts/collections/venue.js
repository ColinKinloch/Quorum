/*global define*/

define([
	'underscore',
	'backbone',
	'models/venue'
], function (_, Backbone, VenueModel) {
	'use strict';
	var VenueCollection = Backbone.Collection.extend({
		model: VenueModel,
		url: '/api/venue'
	});
	return VenueCollection;
});
