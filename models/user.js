const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: "Поле имя является обязательным",
      },
      minlegth: [2, "Минимальная длина 2 символа"],
      maxlength: [30, "Максимальная длина 30 символов"],
    },
    about: {
      type: String,
      required: {
        value: true,
        message: "Поле о себе является обязательным",
      },
      minlegth: [2, "Минимальная длина 2 символа"],
      maxlength: [30, "Максимальная длина 30 символов"],
    },
    avatar: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("user", userSchema);
