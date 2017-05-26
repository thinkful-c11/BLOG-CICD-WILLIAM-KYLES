const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const should = chai.should();

chai.use(chaiHttp);


describe('blogTest', function(){
  before(function(){return runServer();});
  after(function(){return closeServer();});

  //GET//////////////////////////////////////
  it('should list blog entries on GET', function(){});

  //PUSH//////////////////////////////////////
  it('should add new blog post on PUSH', function(){});

  //PUT//////////////////////////////////////
  it('should update blog post on PUT', function(){
    const newObj = {
      title: 'my blog post',
      content: 'here\'s some whining',
      author: 'me!',
      id:''
    };
    return chai.request(app)
    .get("/blog-posts")
    .then(res=>{
      newObj.id = res.body[0].id;
      return chai.request(app)
      .put(`/blog-posts/${newObj.id}`)
      .send(newObj)
    })
    .then(res=>{
      res.should.have.status(204);
      return chai.request(app)
      .get("/blog-posts")
    })
    .then(res=>{
      res.body[0].should.deep.equal(newObj);
    });
  });

  //DELETE//////////////////////////////////////
  it('should delete blog post on DELETE', function(){
    let id=""
    return chai.request(app)
    .get('/blog-posts')
    .then(res=>{
      id = res.body[0].id;
      return chai.request(app)
      .delete(`/blog-posts/${id}`)
    })
    .then(res=>{
      res.should.have.status(204);
    });
  });
});