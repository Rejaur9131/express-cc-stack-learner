const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
// express function does 3 task (routing, middleware, template engine)

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
