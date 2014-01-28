// caminio routes
// define your routes here
module.exports.routes = {
  
  '/caminio': 'DashboardController#index',

  '/locales/:lang': 'DashboardController#locales',

  '/admin': 'AdminController#index',

  'autorest /users': 'User'

};