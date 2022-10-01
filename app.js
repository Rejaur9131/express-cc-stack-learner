const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
// express function does 3 task (routing, middleware, template engine)

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/create', (req, res) => {
  res.render('create');
});

app.get('/', (req, res) => {
  res.render('home');
});

mongoose
  .connect('mongodb://localhost:27017/test')
  .then(() => {
    app.listen(4545, () => {
      console.log('Application is ready to serve on port 4545.');
    });
  })
  .catch((e) => {
    console.log(e);
  });
