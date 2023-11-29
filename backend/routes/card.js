const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/card');
const auth = require('../middlewares/auth');
const {
  validateCreateCard,
  validateCardId,
} = require('../middlewares/validate');

cardRouter.use(auth);
cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', validateCardId, deleteCardById);
cardRouter.put('/cards/:cardId/likes', validateCardId, likeCard);
cardRouter.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouter;
