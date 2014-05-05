/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/event',
	'collections/event',
	'text!templates/pages/home.ejs',
	'text!templates/search.ejs',
	'text!templates/eventPanel.ejs'
], function ($, _, Backbone, EventModel, EventCollection, TemplateText, SearchTemplate, EventPanelTemplate) {
	'use strict';
	var HomeView = Backbone.View.extend({
		template: _.template(TemplateText),
		events: {
			'click #searchSubmit': 'search',
			'click #searchNextPage': 'nextPage',
			'click #searchPrevPage': 'prevPage'
		},
		initialize: function () {
			this.page = 0;
			this.render();
			
			this.collection = new EventCollection();
			
			$('#searchPrevPage').hide();
			this.listenTo(this.collection, 'add', this.add);
			this.listenTo(this.collection, 'add', this.renderResults);
			this.listenTo(this.collection, 'change', this.renderResults);
			
			this.search();
		},
		render: function () {
			console.log('render View');
			this.searchView = _.template(SearchTemplate, {});
			this.$el.html(this.template({search: this.searchView, message: undefined}));
			
		},
		renderResults: function()
		{
			var temp = $('<div>');
			
			_(this.eventPanels).each(function(panel){
				temp.append(panel);
			})
			
			$('#search-results').html(temp.html());
			
		},
		add: function(){
			var that = this;
			this.eventPanels = [];
			this.collection.each(function(event){
				that.eventPanels.push(_.template(EventPanelTemplate, event));
			});
			this.renderResults();
		},
		change: function(el) {
			console.log(el, this.model);
			this.test();
		},
		search: function() {
			console.log('Engage Search!');
			var s =
			{
				q: $('#searchBox').val(),
				type: $('#searchType').val(),
				start: $('#searchStart').val(),
				end: $('#searchEnd').val(),
				lim: $('#searchLim').val(),
				p: this.page
			};
			var sUrl = '/api/event?';
			if(s.q.length>0){
				sUrl += 'q='+s.q+'&';
			}
			if(s.type.length>0){ 
				sUrl += 'type='+s.type+'&';
			}
			if(s.start){
				sUrl += 'start='+s.start+'&';
			}
			if(s.end){
				sUrl += 'start='+s.end+'&';
			}
			sUrl += 'lim='+s.lim+'&p='+s.p;
			
			
			console.log(sUrl)
			
			//Backbone.sync('read', this.collection, {url: sUrl});
			this.collection.reset();
			
			this.collection.fetch({url: sUrl})
			
			console.log(this.collection);
			
			this.add();
			//var newEvent = new EventModel(eventData, {url:'/api/event'});
		},
		nextPage: function()
		{
			this.page++;
			if(this.page>0)
			{
				$('#searchPrevPage').show();
			}
			this.search();
		},
		prevPage: function()
		{
			this.page--;
			if(this.page>0)
			{
				$('#searchPrevPage').show();
			}
			else
			{
				$('#searchPrevPage').hide();
			}
			this.search();
		}
	});
	return HomeView;
});
