define( function( require ){

  var expect = chai.expect;
  var hostURI = 'http://localhost:4004';

  var RESTAdapter = require('ds/rest_adapter');
  var Model       = require('ds/model');

  describe('Model', function() {

    before( function(){
      this.host1 = new RESTAdapter( hostURI );
      var schema = {
        attributes: {
          name: { type: 'string', required: true },
          amount: 'number'
        }
      };
      this.TestModel = Model.define('Test', { adapter: this.host1 }, schema );
    });

    describe('string', function(){

      it('does not pass validation without a name', function(){
        var test = new this.TestModel();
        expect(test.isValid()).to.be.false;
      });
      
      it('passes with a name', function(){
        var test = new this.TestModel({name: 'test'});
        expect(test.isValid()).to.be.true;
      });

    });

    describe('number', function(){

      it('creates a valid number', function(){
        var number = new this.TestModel({amount: '50', name: 'h'});
        console.log(number.toJS());
        expect(number.amount()).to.be.a('number');
      });

    });

  });

});