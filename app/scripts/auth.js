/*global define*/

define([
	'jquery',
], function ($) {
	'use strict';
	
	var Auth = {
		email: null,
		password: null,
		setAuthToken: function() {
			this.email = localStorage.getItem('email');
			this.password = localStorage.getItem('password');
			$.ajax('/login/user', {type: 'POST', beforeSend: function(){}, headers:{username:this.email, password:this.password}, success: function(data){
				localStorage.setItem('token', data.token);
			}});
		}
	};
	
	$.ajaxPrefilter(function(opts){
		if(!opts.beforeSend)
		{
			opts.beforeSend = function(xhr)
			{
				Auth.setAuthToken();
				console.log('token', localStorage.getItem('token'));
				xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem('token'));
			};
		}
	});
	
	return Auth;
});
