define( function( require ){

  'use strict';

  var passwordConditionsRegExp = /(?=^[^\s]{6,128}$)((?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])|(?=.*?\d)(?=.*?[^\w\d\s])(?=.*?[a-z])|(?=.*?[^\w\d\s])(?=.*?[A-Z])(?=.*?[a-z])|(?=.*?\d)(?=.*?[A-Z])(?=.*?[^\w\d\s]))^.*/;

  return {
    uid: uid,
    generatePassword: generatePassword,
    passwordConditionsRegExp: passwordConditionsRegExp
  };

  /**
   * generate a uid of given length
   *
   * @method uid
   * @param {Number} length
   * @return {String} a uid of given length
   */
  function uid( length ){
    var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i)
        retVal += charset.charAt(Math.floor(Math.random() * n));
    return retVal;
  }

  /**
   * generate a valid password of given length
   *
   * @method generatePassword
   * @param {Number} length
   * @return {String} a valid password
   */
  function generatePassword( length ){
    var password = uid(length);
    var charset = "!$#-_?|><";
    var randChar = Math.floor(Math.random() * charset.length);
    var randPos = Math.floor(Math.random() * length);

    var res = password.substring(0,randPos-1) +
              charset.charAt( randChar ) +
              password.substring(randPos+1,length-1);

    // must contain a number, one uppercase character and one special char
    if( !passwordConditionsRegExp.test(res) )
      return generatePassword( length );
    return res;

  }

});