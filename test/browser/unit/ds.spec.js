define( function( require ){

  var expect = chai.expect;
  var hostURI = 'http://localhost:4000';

  var RESTAdapter = require('ds/rest_adapter');

  describe('DS', function() {

    it('initializes a new datastore', function(){
      var host1 = new RESTAdapter( hostURI );
      expect(host1.hostURI).to.eql( hostURI );
    });

  });

});