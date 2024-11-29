
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const {getCards, createCards, deleteCardById} = require('../controllers/cards');
// Ruta para obtener todas las tarjetas
router.get('/', (getCards));

router.delete('/:id', (deleteCardById));

module.exports = router;
