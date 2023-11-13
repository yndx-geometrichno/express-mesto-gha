const { getCards, getCard, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

const router = require('express').Router();

router.get('/', getCards);
router.get('/:cardId', getCard);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = { cardRouter: router };