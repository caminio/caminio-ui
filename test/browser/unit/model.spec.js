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

    describe('#find (empty)', function(){

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

    describe('#create', function(){

      it('creates a new TestModel and gets the model data returned', function(done){
        var test = this;
        this.TestModel.create({name:'testmodel1'}, function( err, resource ){
          expect(err).to.be.null;
          expect(resource).to.have.property('name');
          expect(resource).to.have.property('id');
          expect(resource.name).to.eql('testmodel1');
          test.id = resource.id;
          done();
        });
      });

      it('finds the resource on server', function(done){
        this.TestModel.findOne({id: this.id}, function( err, resource ){
          expect(err).to.be.null;
          expect(resource).to.have.property('name');
          expect(resource.name).to.eql('testmodel1');
          done();
        });
      });

    });

    describe('#update', function(){

      before(function(done){
        var test = this;
        this.TestModel.create({name:'testmodel1'}, function( err, resource ){
          test.resource = resource;
          done();
        });
      })

      it('updates attributes of a model and saves them', function(done){
        var test = this;
        this.resource.name = 'name2';
        this.resource.save(function(err){
          expect(err).to.be.null;
          test.resource.findOne({id: test.resource.id}, function( err, resource ){
            expect(err).to.be.null;
            expect(resource.name).to.eql('name2');
            done();
          })
        });
      });

    });
  });

});