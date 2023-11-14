const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: "Поле имя является обязательным",
      },
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: {
        value: true,
        message: "Поле о себе является обязательным",
      },
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("user", userSchema);
