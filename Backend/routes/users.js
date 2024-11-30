// routes/users.js
const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const router = express.Router();
const { getUsers, getUserInfo, updateUser, updateAvatar, loginUsers, createUsers } = require('../controllers/users');
const userValidation = require('../validations/userValidation');

// Ruta para obtener todos los usuarios (No requiere validación)
router.get('/', getUsers);

// Ruta para obtener la información del usuario logueado (Requiere autenticación)
router.get('/me', getUserInfo);

// Ruta para crear un nuevo usuario (Requiere validación)
router.post('/', celebrate({ body: userValidation.createUserValidation }), createUsers);

// Ruta para login de usuario (Requiere validación)
router.post('/login', celebrate({ body: userValidation.loginUserValidation }), loginUsers);

// Ruta para actualizar el usuario (Requiere autenticación y validación)
router.put('/me', celebrate({ body: userValidation.updateUserValidation }), updateUser);

// Ruta para actualizar el avatar (Requiere autenticación y validación)
router.put('/me/avatar', celebrate({ body: userValidation.updateAvatarValidation }), updateAvatar);

// Ruta para obtener un usuario por ID (Requiere validación del ID)
router.get('/:id', celebrate({ params: { id: Joi.string().length(24).hex().required() } }), getUserInfo);

module.exports = router;