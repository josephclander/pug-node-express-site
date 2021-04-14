const express = require('express');
const { projects } = require('./data.json');
const path = require('path');
const app = express();
let PORT = 3000;

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project/:id', (req, res, next) => {
  const projectID = req.params.id;
  if (projects[projectID]) {
    res.render('project', { projects, projectID });
  } else {
    // create error 404 if project not found
    const err = new Error('The project is not found');
    err.status = 404;
    console.log(err.status, err.message);
    next(err);
  }
});

// path to test 500 server errors (as requested in instructions)
app.get('/error', (req, res, next) => {
  const err = new Error('This is a test server error');
  err.status = 500;
  console.log(err.status, err.message);
  next(err);
});

// create error 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  console.log(err.status, err.message);
  next(err);
});

// global error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(PORT, console.log(`App listening on port ${PORT}`));
