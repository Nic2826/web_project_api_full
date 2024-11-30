const express = require('express');
const { celebrate } = require('celebrate');
const router = express.Router();
const { getCards, createCards, deleteCardById } = require('../controllers/cards');
const cardValidation = require('../validations/cardValidation');

// Ruta para obtener todas las tarjetas (No requiere validación)
router.get('/', getCards);

// Ruta para crear una tarjeta (Requiere validación)
router.post('/', celebrate({ body: cardValidation.createCardValidation }), createCards);

// Ruta para eliminar una tarjeta por ID (Requiere validación en params)
router.delete('/:id', celebrate({ params: cardValidation.deleteCardValidation}), deleteCardById);

module.exports = router;
