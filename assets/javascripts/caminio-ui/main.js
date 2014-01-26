/**
 * caminio-ui main
 */

var App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: caminioHostname
});

App.Router.map(function() {
  this.resource('users');
  this.resource('groups');
  this.resource('domains');
});