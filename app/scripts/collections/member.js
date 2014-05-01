/*global define*/

define([
	'underscore',
	'backbone',
	'models/member',
	'collections/user'
], function (_, Backbone, MemberModel, UserCollection) {
	'use strict';
	var MemberCollection = UserCollection.extend({
		model: MemberModel,
		url: '/api/member'
	});
	return MemberCollection;
});
