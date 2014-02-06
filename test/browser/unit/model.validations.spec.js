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
          amount: 'number',
          price:  'float',
          createdAt: 'date',
          modified: {
            at: 'date'
          }
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

      describe('is valid', function(){

        it('from number', function(){
          var number = new this.TestModel({amount: 22});
          expect(number.amount()).to.be.a('number');
          expect(number.amount()).to.eql(22);
        });

        it('from float (omitting decimal places and integer rounds always to lower number)', function(){
          var number = new this.TestModel({amount: 13.7603});
          expect(number.amount()).to.be.a('number');
          expect(number.amount()).to.eql(13);
        });

        it('from string', function(){
          var number = new this.TestModel({amount: '50'});
          expect(number.amount()).to.be.a('number');
          expect(number.amount()).to.eql(50);
        });

      });

      describe('invalid', function(){

        it('containing characters', function(){
          var number = new this.TestModel({amount: 'x'});
          expect(number.amount()).to.be.undefined;
        });

      });

    });

    describe('float', function(){

      describe('is valid', function(){

        it('from float', function(){
          var number = new this.TestModel({price: 50.5});
          expect(number.price()).to.be.a('number');
          expect(number.price()).to.eql(50.5);
        });

        it('from string', function(){
          var number = new this.TestModel({price: '50.5'});
          expect(number.price()).to.be.a('number');
          expect(number.price()).to.eql(50.5);
        });

        it('from german/DIN', function(){
          var number = new this.TestModel({price: '12,75'});
          expect(number.price()).to.be.a('number');
          expect(number.price()).to.eql(12.75);
        });

      });

      describe('invalid', function(){

        it('containing characters', function(){
          var number = new this.TestModel({price: 'x'});
          expect(number.price()).to.be.undefined;
        });

      });

    });

    describe('date', function(){

      describe('valid', function(){

        it('from string', function(){
          var number = new this.TestModel({createdAt: '2014-01-01'});
          expect(number.createdAt()).to.be.a('date');
          expect(number.createdAt()).to.eql(new Date(2014,0,1));
        });

      });

      describe('invalid', function(){

        it('from unknown string', function(){
          var number = new this.TestModel({createdAt: 'aaaa-bb-cc'});
          expect(number.createdAt()).to.be.undefined;
        });

      });

    });

    describe('object', function(){

      describe('valid', function(){

        it('has keys and values', function(){
          var number = new this.TestModel({ modified: {at: '2014-01-01'} });
          expect(number.modified.at()).to.be.a('date');
          expect(number.modified.at()).to.eql(new Date(2014,0,1));
        });

      });

    });

  });

});