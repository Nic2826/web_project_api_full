const Joi = require('joi');

// Validación para crear un usuario
const createUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(30).required(),
  about: Joi.string().min(2).max(30).required(),
  avatar: Joi.string().uri().default('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
});

// Validación para login de usuario
const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Validación para actualizar un usuario
const updateUserValidation = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email()
});

// Validación para actualizar el avatar
const updateAvatarValidation = Joi.object({
  avatar: Joi.string().uri().required()
});

module.exports = { createUserValidation, loginUserValidation, updateUserValidation, updateAvatarValidation };