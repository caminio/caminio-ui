var Gear    = require('caminio/gear');
new Gear({ 
  api: true,
  applications: [
    { name: 'dashboard', icon: 'home', path: '/caminio' },
    { name: 'admin', icon: 'gears', admin: true, path: '/caminio/admin' }
  ]
});
