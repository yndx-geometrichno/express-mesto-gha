const User = require("../models/user");
const ApiError = require("../error/ApiError");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next();
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(new Error("NotFound"));
    return res.send(user);
  } catch (err) {
    if (err.message === "NotFound") {
      return next(
        ApiError.badRequest("Пользователь по указанному _id не найден")
      );
    }
    if (err.name === "CastError") {
      return next(ApiError.invalid("Id is not valid"));
    }
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    return res.send(await newUser.save());
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(
        ApiError.invalid(
          "Переданы некорректные данные при создании пользователя"
        )
      );
    }
    return next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const userId = req.body._id;
    const updateUser = await User.findOneAndUpdate(
      userId,
      { $set: { name, about } },
      { new: true, runValidators: true }
    ).orFail(new Error("ValidationError"));
    return res.send(updateUser);
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      return next(
        ApiError.invalid("Переданы некорректные данные при обновлении профиля")
      );
    }
    return next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userUpdateAvatar = await User.findOneAndUpdate(
      req.body._id,
      { $set: { avatar } },
      { new: true, runValidators: true }
    );
    return res.send(userUpdateAvatar);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(
        ApiError.invalid("Переданы некорректные данные при обновлении аватара.")
      );
    }
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
