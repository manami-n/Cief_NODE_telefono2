// Cargar los módulos
import express from 'express';
//const express = require('express');
const app = express();
// const bodyParser = require('body-parser'); // it's npm module.

// Importado las rutas
//const rutas = require('./rutas')
import router from './router.js'

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})