/**
 * @class UsersController
 */
module.exports = function UsersController( caminio, policies, middleware ){

  return {

    _before: {
      '*': policies.ensureLogin
    }

  };

};