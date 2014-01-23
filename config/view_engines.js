var hbs = require('express-hbs')
  , join = require('path').join;

module.exports.viewEngines = {
  
  'handlebars': {
    engine: hbs.express3({ 
      beautify: true, 
      partialsDir: join(__dirname,'..','api','views','partials') 
    }),
    ext: [ 'hbs' ],
    default: 'hbs',
    exec: function( caminio, req, res, cb ){

      cb();

    }
  }


}