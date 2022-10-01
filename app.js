const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {
  createPollGetConroller,
  createPollPostConroller,
  getAllPolls,
  viewPollGetController,
  viewPollPostController,
} = require('./pollController');

const app = express();
// express function does 3 task (routing, middleware, template engine)

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/create', createPollGetConroller);
app.post('/create', createPollPostConroller);

app.get('/polls/:id', viewPollGetController);
app.post('/polls/:id', viewPollPostController);
app.get('/polls', getAllPolls);

app.get('/', (req, res) => {
  res.render('home');
});

mongoose
  .connect('mongodb://localhost:27017/express-cc-stack-learner')
  .then(() => {
    app.listen(4545, () => {
      console.log('Application is ready to serve on port 4545.');
    });
  })
  .catch((e) => {
    console.log(e);
  });
