/**
 * @class DashboardController
 */
module.exports = function DashboardController( caminio, policies, middleware ){

  'use strict';

  return {

    _before: {
      '*': policies.ensureLogin
    },

    /**
     * @method index
     */
    'index': [
      function( req, res ){
        res.caminio.render();
      }
    ],

    /**
     * @method locales
     */

    'locales':
      function( req, res ){
        res.json( caminio.i18n.find( req.param('lang')) );
      }


  };

};
