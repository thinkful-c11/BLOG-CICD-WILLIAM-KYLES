const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const should = chai.should();

chai.use(chaiHttp);


describe('blogTest', function(){
  before(function(){return runServer();});
  after(function(){return closeServer();});

  //GET//////////////////////////////////////
  it('should list blog entries on GET', function(){
    return chai.request(app)
    .get('/blog-posts')
    .then(res=>{
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.length.should.be.at.least(1);
      res.body.forEach(el=>{
        el.should.be.a('object');
        el.should.include.keys('id','title','content','author','publishDate');
      });
    });
  });

  //PUSH//////////////////////////////////////
  it('should add new blog post on PUSH', function(){
    const newObj ={
      title: 'my blog post',
      content: 'here\'s some whining',
      author: 'me!',
    }
    return chai.request(app)
    .post('/blog-posts')
    .send(newObj)
    .then(res=>{
      res.should.have.status(201);
      return chai.request(app)
      .get('/blog-posts');
    }).then(res=>{
      res.body[0].should.deep.equal(Object.assign(newObj,{id:res.body[0].id,publishDate:res.body[0].publishDate}));
      res.body[0].should.be.a('object');
      res.body[0].should.include.keys('id','title','content','author','publishDate');
    });
  });

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