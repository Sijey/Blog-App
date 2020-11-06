const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const {Client} = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'post',
  password: 'vipower',
  port: 5432
});

client.connect();

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'content-type'
  });
  next();
})

app.get('/api/posts', (req, res) => {
  client.query('SELECT * FROM posts', (err, dbResponse) => {
    res.json(dbResponse.rows);
  });
});

app.get('/api/posts/:id',(req, res) => {
  client.query('SELECT * FROM posts WHERE id = $1', [+req.params.id], (err, dbResponse) => {
    res.json(dbResponse.rows[0]);
  });
});

app.post('/api/posts', bodyParser.json(), (req, res) => {
  const post = {...req.body, id: Math.max(...posts.map(post => post.id)) + 1};
  posts.push(post);
  res.json(post);
});

app.get('/api/users', (req, res) => {
  client.query('SELECT * FROM users', (err, dbResponse) => {
    res.json(dbResponse.rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
