module.exports = function UtilController( caminio, policies, middleware ){

  return {

    /**
     * @method countries
     */
    'countries': function( req, res ){
      var countryCodes = require( __dirname + '/../../lib/country_codes');
      res.json( countryCodes[req.param('lang')] );
    }

  };

};