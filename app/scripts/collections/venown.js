/*global define*/

define([
	'underscore',
	'backbone',
	'models/venown',
	'collections/user'
], function (_, Backbone, VenownModel, UserCollection) {
	'use strict';
	var VenownCollection = UserCollection.extend({
		model: VenownModel,
		url: '/api/venown'
	});
	return VenownCollection;
});
