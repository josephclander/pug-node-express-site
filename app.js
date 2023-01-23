const express = require('express');
const { projects } = require('./data.json');
const path = require('path');
const app = express();
require('dotenv').config()
const PORT = process.env.port || 3000;

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
  const err = new Error('This page is not found');
  err.status = 404;
  console.log(err.status, err.message);
  next(err);
});

// global error handler
app.use((err, req, res, next) => {
  // passing in error object to response
  res.locals.error = err;
  // passing the error status to response
  res.status(err.status || 500);
  if (err.status === 404) {
    res.render('page-not-found');
  } else {
    res.render('error');
  }
});

app.listen(PORT, console.log(`App listening on port ${PORT}`));
