define( function( require ){

  var expect = chai.expect;
  var hostURI = 'http://localhost:4004';

  var RESTAdapter = require('ds/rest_adapter');
  var Model       = require('ds/model');

  describe('Model', function() {

    before( function(done){
      this.host1 = new RESTAdapter( hostURI );
      this.TestModel = Model.define('Test', { adapter: this.host1 });
      this.TestModel.create({ name: 'test' }, done );
    });

    it('defines a new model', function(){
      var TestModel = Model.define('Test', { adapter: this.RESTAdapter });
      expect(TestModel).to.be.a('function');
    });

    it('#url', function(){
      expect(this.TestModel.url()).to.be.eql( hostURI+'/tests' );
    });

    describe('#find', function(){
      
      before(function(done){
        var test = this;
        this.TestModel.create({name:'testmodel2'}, function( err, resource ){
          test.resource = resource;
          done();
        });
      });

      it('returns a ko.observable', function(){
        var results = this.TestModel.find();
        expect( results ).to.be.a('function');
        expect( results() ).to.be.an('array');
      });

      it('callback passes err, same ko.observable', function(){
        this.TestModel.find( function( err, resources ){
          expect(err).to.be.null;
          expect( resources ).to.be.a('function');
          expect( resources() ).to.be.an('array');
        });
      });

      it('finds an array of tests', function(){
        this.TestModel.find( function( err, resources ){
          expect(err).to.be.null;
          expect(resources()).to.be.an('array');
          expect(resources()).to.have.length.above(0);
        });
      });

      it('an item of passed err, array is an instance of TestModel', function(){
        var test = this;
        this.TestModel.find( function( err, resources ){
          expect(err).to.be.null;
          expect(resources()[0]).to.be.an.instanceOf(test.TestModel);
        });
      });

      it('callback passes an empty array if nothing matched', function(){
        var test = this;
        this.TestModel.find({ name: 'aaaaaa' }, function( err, resources ){
          expect(err).to.be.null;
          expect(resources()).to.have.lengthOf(0);
        });
      });

    });

    describe('#findOne', function(){
      
      before(function(done){
        var test = this;
        this.TestModel.create({name:'testmodel0x'}, function( err, resource ){
          test.resource = resource;
          done();
        });
      });

      it('returns undefined', function(){
        expect( this.TestModel.findOne() ).to.be.undefined;
      });

      it('callback passes err, and one resource', function(){
        var test = this;
        this.TestModel.findOne( function( err, resource ){
          expect(err).to.be.null;
          expect( resource ).to.be.an.instanceOf(test.TestModel);
        });
      });

      it('callback passes err, null if no resource was found', function(){
        var test = this;
        this.TestModel.findOne( { id: '123456789012345678901234' }, function( err, resource ){
          expect(err).to.be.null;
          expect(resource).to.be.null;
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
        this.TestModel.create({name:'testmodel2'}, function( err, resource ){
          test.resource = resource;
          done();
        });
      });

      it('updates attributes of a model and saves them', function(done){
        var test = this;
        this.resource.name = 'name2';
        this.resource.save(function(err){
          expect(err).to.be.null;
          test.TestModel.findOne({id: test.resource.id}, function( err, resource ){
            expect(err).to.be.null;
            expect(resource.name).to.eql('name2');
            done();
          });
        });
      });

    });

    describe('#delete', function(){

      before(function(done){
        var test = this;
        this.TestModel.create({name:'testmodel3'}, function( err, resource ){
          test.resource = resource;
          done();
        });
      });

      it('finds the model', function(done){
        var test = this;
        test.TestModel.findOne({id: test.resource.id}, function( err, resource ){
          expect(err).to.be.null;
          expect(resource.id).to.eql(test.resource.id);
          done();
        });
      });

      it('destroys the model', function(done){
        var test = this;
        test.resource.destroy(function( err ){
          expect(err).to.be.null;
          done();
        });
      });

      it('does not find the model any more', function(done){
        var test = this;
        test.TestModel.findOne({id: test.resource.id}, function( err, resource ){
          expect(err).to.be.null;
          expect(resource).to.be.null;
          done();
        });
      });

    });
    
  });

});