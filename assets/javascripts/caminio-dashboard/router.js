( function( App ){

  'use strict';

  App.IndexRoute = Ember.Route.extend({
    setupController: function( controller ){
      _loadAppointments( controller );
    }
  });

  App.IndexController = Ember.Controller.extend({
  });

  App.AppointmentsItemController = Ember.Controller.extend({
    formatAppointmentDate: function(){
      var date = this.get('content.start');
      if( moment(date).format('YYYY-MM-DD') === moment().format('YYY-MM-DD') )
        return moment(date).format('HH:mm');
      if( moment(date).add('d',2) < moment().add('d',2) )
        return Em.I18n.t('tomorrow') +', '+moment(date).format('HH:mm');
      return moment(date).format('DD.MM. HH:mm');
    }.property('content.start')
  });

  App.ApplicationView = Em.View.extend({
    didInsertElement: function(){
      setupCaminio(this.$());
      this.$('.mini-apps-container').html(
        $('.apps-container').html()
      );
    }
  });

  function _loadAppointments( controller ){
    //$.getJSON( '/caminio/appointments?start='+moment().format('YYYY-MM-DD')+'&end='+moment().add('d',1).format('YYYY-MM-DD')+'&limit=2&force-all=1' )
    $.getJSON( '/caminio/appointments?start='+moment().format('YYYY-MM-DD')+'&limit=2&force-all=1' )
      .then( function( appointments ){
        controller.set('appointments', appointments);      
      });
  }

})( App );
