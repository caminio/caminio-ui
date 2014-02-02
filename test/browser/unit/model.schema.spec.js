define( function( require ){

  var expect = chai.expect;
  var hostURI = 'http://localhost:4004';
  var ko          = require('knockout');

  var RESTAdapter = require('ds/rest_adapter');
  var Model       = require('ds/model');

  describe('Model Schema', function() {

    before( function(){
      this.host1 = new RESTAdapter( hostURI );
      this.TestModel = Model.define('Test', 
        { adapter: this.host1 }, 
        { attributes: {
            name: 'string'
          }
        }
      );
    });

    it('has name set as an observable', function(done){
      this.TestModel.create({ name: 'test' }, function(err,testModel){
        expect(err).to.be.null;
        expect(testModel.name).to.be.a('function');
        done();
      });
    });
    
  });

});