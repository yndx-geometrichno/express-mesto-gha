const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const userRouter = require("./users");
const cardRouter = require("./cards");
const auth = require("../middleware/auth");
const { createUser, login } = require("../controllers/users");

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

router.post(
  "/signup",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30).default("Жак-Ив Кусто"),
        about: Joi.string().min(2).max(30).default("Исследователь"),
        avatar: Joi.string()
          .regex(URL_REGEX)
          .default(
            "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
          ),
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
