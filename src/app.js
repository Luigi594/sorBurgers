const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

// variable de entorno
require('dotenv').config();

// aqui un único archivo de rutas, será el index.js
const rutas = require('./routes');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.set('json spaces', 2);

app.use('/api/', rutas);
app.use('/usuario/img/', express.static(path.join(__dirname, 'public/img')));

app.listen(3003);