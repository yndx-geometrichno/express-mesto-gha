const {
  getUsers,
  getUser,
  createUser,
  updateUserAvatar,
  updateUserInfo,
} = require("../controllers/users");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.patch("/me", updateUserInfo);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
