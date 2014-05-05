/*global define*/

define([
	'underscore',
	'backbone',
	'models/comsub',
	'collections/user'
], function (_, Backbone, ComsubModel, UserCollection) {
	'use strict';
	var ComsubCollection = UserCollection.extend({
		model: ComsubModel,
		url: '/api/comsub'
	});
	return ComsubCollection;
});
