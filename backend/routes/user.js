const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middlewares/validate');

const {
  getUsers, updateUser, updateAvatar, currentUser,
} = require('../controllers/user');

// Проверка авторизации
userRouter.use(auth);

userRouter.get('/users', getUsers); // возвращает всех пользователей

userRouter.get('/users/me', currentUser); // возвращает информацию о текущем пользователе

userRouter.patch('/users/me', validateUpdateUser, updateUser); // обновляет профиль

userRouter.patch('/users/me/avatar', updateAvatar); // обновляет аватар

module.exports = userRouter;
