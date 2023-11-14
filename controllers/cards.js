const Card = require("../models/card");
const ApiError = require("../error/ApiError");

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next();
  }
};

const getCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = Card.findById(cardId).orFail(new Error("NotFound"));
    return res.send(card);
  } catch (err) {
    if (err.message === "NotFound") {
      return next(ApiError.badRequest("Карточка с указанным _id не найдена."));
    }
    if (err.name === "CastError") {
      return next(ApiError.invalid("Id is not valid"));
    }
    return next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id });
    return res.send(await newCard.save());
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(
        ApiError.invalid("Переданы некорректные данные при создании карточки")
      );
    }
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findOneAndDelete({ _id: cardId }).orFail(
      new Error("NotFound")
    );
    return res.send(card, { message: "Данная карточка удалена успешно" });
  } catch (err) {
    if (err.message === "NotFound") {
      return next(ApiError.badRequest("Карточка с указанным _id не найдена."));
    }
    if (err.name === "CastError") {
      return next(ApiError.invalid("Id is not valid"));
    }
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;
    const cardLiked = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true }
    ).orFail(new Error("NotFound"));
    return res.send(cardLiked, { message: "Лайк поставлен" });
  } catch (err) {
    if (err.message === "NotFound") {
      return next(ApiError.badRequest("Карточка с указанным _id не найдена."));
    }
    if (err.name === "CastError") {
      return next(ApiError.invalid("Id is not valid"));
    }
    return next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;
    const cardDisliked = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true }
    ).orFail(new Error("NotFound"));
    return res.send(cardDisliked, { message: "Your like was removed" });
  } catch (err) {
    if (err.message === "NotFound") {
      return next(ApiError.badRequest("Карточка с указанным _id не найдена."));
    }
    if (err.name === "CastError") {
      return next(ApiError.invalid("Id is not valid"));
    }
    return next(err);
  }
};

module.exports = {
  getCard,
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
