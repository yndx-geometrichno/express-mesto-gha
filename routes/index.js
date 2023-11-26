require("dotenv").config();
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const userRouter = require("./users");
const cardRouter = require("./cards");
const auth = require("../middleware/auth");
const { createUser, login } = require("../controllers/users");

const { DEFAULT_USER_NAME, DEFAULT_USER_ABOUT, DEFAULT_USER_AVATAR } =
  process.env;

router.post(
  "/signup",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30).default(DEFAULT_USER_NAME),
        about: Joi.string().min(2).max(30).default(DEFAULT_USER_ABOUT),
        avatar: Joi.string().uri().default(DEFAULT_USER_AVATAR),
      })
      .unknown(true),
  }),
  createUser
);
router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);
router.use(auth);
router.use("/users", userRouter);
router.use("/cards", cardRouter);
router.use("*", (req, res) => {
  res.status(404).send({ message: "This page is not exist" });
});

module.exports = router;
