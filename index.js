var Gear    = require('caminio/gear');
new Gear({ 
  api: true,
  applications: [
    { name: 'admin', icon: 'gears', admin: true, path: '/caminio/admin#users' }
  ]
});
