'use strict';

const express = require('express');

const bodyParser = require ('body-parser');

const logger = require('morgan');

const app = express();

const {BlogPosts} = require('./models');

const blogRouter = express.Router();

const jsonParser = bodyParser.json();

app.use(logger('common'));
app.use(jsonParser);

app.use("/blog-posts", blogRouter);

console.log('is any of this working?');

blogRouter.get("/", (req, res) => {
  console.log('heard ya!');
  res.json(BlogPosts.get());
});

blogRouter.post("/", (req, res)=> {
  // BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  console.log(req);
  res.status(201).end();
});

blogRouter.delete("/:id", (req, res)=>{
  BlogPosts.delete(req.params.id);
  res.status(204).end();
});

blogRouter.put("/:id", (req, res)=>{
  BlogPosts.update({title: req.body.title, content: req.body.content, author: req.body.author, publishDate: req.body.publishDate, id: req.params.id});
  res.status(204).end();
});

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};