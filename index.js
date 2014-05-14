var Gear    = require('caminio/gear');
new Gear({ 
  api: true,
  applications: [
    { name: 'settings', icon: 'gears', admin: true, path: '/settings' }
  ]
});
