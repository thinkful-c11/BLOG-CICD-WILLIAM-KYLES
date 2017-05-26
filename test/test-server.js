const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const should = chai.should();

chai.use(chaiHttp);

//testingTravis

let answer = true;

describe('basic true test', function(){
  it('should assert that true is, in fact, true', function(){
    answer.should.equal(true);
  });
  it('should assert that true is not, in fact, false', function(){
    answer.should.not.equal(false);
  });
});