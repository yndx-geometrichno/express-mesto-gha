// const router = require("express").Router();
const Router = require("express");
const router = new Router();
const userRouter = require("./users");
const cardRouter = require("./cards");

router.use("/users", userRouter);
router.use("/cards", cardRouter);

module.exports = router;
