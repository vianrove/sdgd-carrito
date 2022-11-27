const express = require('express');
const { getList,CreateList,UpdateList,DeleteFromList,viewSpesific } = require('../db/methods');

const rutas = express.Router();

rutas.get('/',getList);

rutas.post('/',CreateList);

rutas.get('/:id/:UserID',viewSpesific);

rutas.put('/:id',UpdateList);

rutas.delete('/:id',DeleteFromList);


module.exports = rutas