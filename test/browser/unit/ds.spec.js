define( function( require ){

  var expect = chai.expect;
  var hostURI = 'http://localhost:4000';

  var RESTAdapter = require('ds/rest_adapter');

  describe('DS', function() {

    it('initializes a new datastore', function(){
      RESTAdapter.init( hostURI );
      expect(RESTAdapter.hostURI).to.eql( hostURI );
    });

  });

});