// const router = require("express").Router();
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const userRouter = require("./users");
const cardRouter = require("./cards");
const auth = require("../middleware/auth");
const { createUser, login } = require("../controllers/users");

router.post(
  "/signup",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().default("Жак-Ив Кусто"),
        about: Joi.string().default("Исследователь"),
        avatar: Joi.string().default(
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
