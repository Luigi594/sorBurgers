const express = require('express');
const morgan = require('morgan');
const app = express();

// aqui un único archivo de rutas, será el index.js
const rutas = require('./routes/');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.set('json spaces', 2);

app.listen(3003);