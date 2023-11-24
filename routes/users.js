const router = require("express").Router();
const {
  getUsers,
  getUser,
  getMe,
  updateUserAvatar,
  updateUserInfo,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getMe);
router.get("/:userId", getUser);
router.patch("/me", updateUserInfo);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
