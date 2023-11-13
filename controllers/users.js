const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "проищошла ошибка", err }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка", err }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "произошла ошибка", err }));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findOneAndUpdate(req.body._id, { $set: { name, about } }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "произошла ошибка", err }));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findOneAndUpdate(req.body._id, { $set: { avatar } }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "произошла ошибка", err }));
};
