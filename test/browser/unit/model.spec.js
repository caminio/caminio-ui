define( function( require ){

  var expect = chai.expect;
  var hostURI = 'http://localhost:4004';

  var RESTAdapter = require('ds/rest_adapter');
  var Model       = require('ds/model');

  describe('Model', function() {

    before( function(done){
      RESTAdapter.init( hostURI );
      this.TestModel = Model.define('Test', { adapter: RESTAdapter });
      this.TestModel.create({ name: 'test' }, done );
    });

    it('defines a new model', function(){
      var TestModel = Model.define('Test', { adapter: RESTAdapter });
      expect(TestModel).to.be.a('function');
    });

    it('#url', function(){
      expect(this.TestModel.url()).to.be.eql( hostURI+'/tests' );
    });

    describe('#find', function(){

      it('returns a ko.observable', function(){
        var results = this.TestModel.find();
        expect( results ).to.be.a('function');
        expect( results() ).to.be.an('array');
      });

      it('finds an array of test docs', function(){
        var results = this.TestModel.find( function( err, docs ){
          expect(err).to.be.null;
          expect(docs()).to.be.an('array');
        });
      });

    });

  });

});