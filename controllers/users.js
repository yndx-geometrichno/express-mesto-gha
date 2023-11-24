const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const ApiError = require("../error/ApiError");

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next(err);
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

const getMe = async (req,res,next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).orFail(new Error("NotFound"));
    return res.send(user);
  } catch (err) {
    if (err.message === "NotFound") {
      return next(
        ApiError.badRequest("Пользователь по указанному _id не найден")
      );
    }
    return next(err)
  }
}

const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hashPass = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashPass,
    });
    return res.status(201).send({email: newUser.email, _id: newUser._id});

  } catch (err) {
    if (err.name === "ValidationError") {
      return next(
        ApiError.invalid(
          "Переданы некорректные данные при создании пользователя"
        )
      );
    }
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(
        ApiError.conflict("Пользователь с таким Email уже зарегистрирован")
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
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    return User.findUserByCredentials(email, password).then((user) => {
      const token = jwt.sign({ _id: user._id }, "very-secret-key", {
        expiresIn: "7d",
      });
      res.send({ token });
      return next({ token, user });
    });
  } catch (err) {
    if (err.message === "WrongUserData") {
      return next(
        ApiError.unauthorized(`Неправильные почта или пароль, ${err}`)
      );
    }
    return next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  getMe,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
