App.User = DS.Model.extend({
  fullName: DS.attr('string'),
  lastRequestAt: DS.attr('date')
});

