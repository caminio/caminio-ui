var _     = require('lodash');
var join  = require('path').join;
var fs    = require('fs');

// global middleware actions to be run
// in every request
module.exports = function( caminio ){

  return [ 
    sideinfoBoxes,
    dashboardBoxes
  ];

  /**
   * reads sideinfo box requests from gears
   *
   * @method sideinfoBoxes
   *
   */
  function sideinfoBoxes( req, res, next ){
    res.locals.sideinfoBoxes = [];
    _.each( caminio.gears, function( gear ){
      var sideinfoDir = join(gear.paths.absolute,'api','sideinfos');
      if( fs.existsSync( sideinfoDir ) ){
        fs.readdirSync( sideinfoDir )
          .forEach( function( file ){
            res.locals.sideinfoBoxes.push( fs.readFileSync(join(sideinfoDir, file)) );
          });
      }
    });
    next();
  }

  /**
   * reads dashboard boxes from gears
   *
   * @method dashboardBoxes
   *
   */
  function dashboardBoxes( req, res, next ){
    res.locals.dashboardBoxes = [];
    _.each( caminio.gears, function( gear ){
      var dir = join(gear.paths.absolute,'api','dashboard-addons');
      if( fs.existsSync( dir ) ){
        fs.readdirSync( dir )
          .forEach( function( file ){
            res.locals.dashboardBoxes.push( fs.readFileSync(join(dir, file)) );
          });
      }
    });
    next();
  }

};