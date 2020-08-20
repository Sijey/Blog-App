const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const posts = [];

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', bodyParser.json(), (req, res) => {
  const post = {...req.body, id: Math.max(...posts.map(post => post.id)) + 1};
  posts.push(post);
  res.json(post);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});