// caminio routes
// define your routes here
module.exports.routes = {
  
  '/caminio': 'DashboardController#index',

  '/caminio/locales/:lang': 'DashboardController#locales',

  '/caminio/admin': 'AdminController#index',

  'get /caminio/users/migrate': 'UsersController#migrate',

  'autorest /caminio/users': 'User',

  'autorest /caminio/labels': 'Label',

  '/caminio/profiles/:id': 'ProfilesController#show',

  'GET /caminio/util/countries': 'UtilController#countries'

};