module.exports = function ProfilesController( caminio, policies, middleware ){

  var User = caminio.models.User;

  return {

    _before: {
      '*': policies.ensureLogin
    },

    /**
     * @method index
     */
    'show': [
      function( req, res ){
        res.caminio.render();
      }
    ]

  };

};