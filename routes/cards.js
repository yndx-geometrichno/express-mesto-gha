const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.get("/:cardId", getCard);
router.post(
  "/",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().uri().required(),
      })
      .unknown(true),
  }),
  createCard
);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
