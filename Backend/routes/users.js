// routes/users.js
const router = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi');

const {
  getUsers,
  getUserInfo,
  updateUser,
  updateAvatar,
  loginUsers,
  createUsers
} = require('../controllers/users');

const {
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
  updateAvatarValidation
} = require('../validations/userValidation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.post('/', celebrate(createUserValidation), createUsers);
router.post('/login', celebrate(loginUserValidation), loginUsers);
router.put('users/me', celebrate(updateUserValidation), updateUser);
router.put('users/me/avatar', celebrate(updateAvatarValidation), updateAvatar);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required()
  })
}), getUserInfo);

module.exports = router;