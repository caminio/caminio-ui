var join          = require('path').join;
var fs            = require('fs');
var async         = require('async');

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
    ],

    /**
     * serve static files in case of development mode;
     */
    'pics': [
      getUser,
      function( req, res ){
        var filename = join(req.user.camDomains[0].contentPath, 'public', 'users', 
                            (req.user.mediafiles.length > 0 ? req.user.mediafiles[0]._id : '') + '.jpg');
        if( !fs.existsSync( filename ) )
          return res.send(404, 'File not found');
        return res.sendfile( filename );
      }],

    /**
     * known email addresses
     */
    'knownEmailAddresses': [
      function( req, res, next ){ req.params.id = res.locals.currentUser._id; next(); },
      getUser,
      getEmailAddresses,
      function( req, res ){
        res.json( req.emails.map( function(email){ return { value: email }; } ));
      }
    ]

  };

  function getUser( req, res, next ){
    User.findOne({ _id: req.param('id') })
      .populate('camDomains')
      .exec( function( err, user ){
      if( err ){ return res.json(500, { error: 'server_error', details: err } ); }
      if( !user ){ return res.json(404, { erro: 'not_found' }); }
      req.user = user;
      next();
    });
  }

  function getEmailAddresses( req, res, next ){
    var regexp = new RegExp(req.param('q'),'i');
    User
      .find({ camDomains: { '$in': req.user.populated('camDomains') }, email: regexp})
      .sort({ email: 'asc' })
      .exec( function( err, users ){
        if( err ){ console.error(err); return res.json(500, { error: 'server_error', details: err } ); }
        req.emails = users.map(function(user){ return user.email; });
        next();
      });
  }

};
