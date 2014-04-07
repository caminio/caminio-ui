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
      getUser,
      function( req, res ){
        res.caminio.render();
      }
    ]

  };

  function getUser( req, res, next ){
    User.findOne({ _id: req.param('id') }, function( err, user ){
      if( err ){ return res.send(404,'user not found'); }
      res.locals.user = user;
      next();
    });
  }

};