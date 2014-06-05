/* 
*
* @Author: thorsten zerha
* @Company: TASTENWERK e.U.
* @Copyright: 2014 by TASTENWERK
* @License: Commercial
*
* @Date:   2014-03-21 18:52:59
*
* @Last Modified by:   thorsten zerha
* @Last Modified time: 2014-04-01 17:28:41
*
* This source code is not part of the public domain
* If server side nodejs, it is intendet to be read by
* authorized staff, collaborator or legal partner of
* TASTENWERK only
*
*/
module.exports = function Labels( caminio, policies, middleware ){

  var Label = caminio.models.Label;

  return {

    _policies: {
      '*!( index, show)': policies.ensureLogin,
      'index, show': policies.ensureLoginOrApiOrToken,
    },
    _before: {
      'create,update': cleanupUsersAccess
    },

    index: function( req, res ){
      var q = Label.find({ camDomain: res.locals.currentDomain._id })
        .or([
          { 
            usersAccess : { "$size" : 0 }
          },
          {
            usersAccess: res.locals.currentUser._id
          }
        ]);
      var type = req.param('type');
      if( type.match(/^regexp/) )
        type = new RegExp( req.param('type').replace('regexp(/','').replace('/)',''));
      if( req.param('type') )
        q.where({type: type});

      q.sort({ name: 1 });
      q.exec( function( err, labels ){
        if( err ){ return res.json(500, { error: 'server_error' }); }
        res.json({ labels: labels });
      });
    }

  };

  function cleanupUsersAccess( req, res, next ){
    if( req.body.label && req.body.label.usersAccess && 
        req.body.label.usersAccess.length > 0 && 
        typeof(req.body.label.usersAccess[0]) === 'object' ){
      var usersAccess = [];
      req.body.label.usersAccess.forEach(function(u){
        usersAccess.push( u._id );
      });
      req.body.label.usersAccess = usersAccess;
    }
    next();
  }

};
