const express = require('express');
const data = require('./data.json');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', data.projects);
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project/:id', (req, res) => {
  const projectID = req.params.id;
  res.render('project', { data, projectID });
});

app.listen(3000, console.log('App listening on port 3000'));
