const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
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
    link: {
      type: String,
      required: {
        value: true,
        message: "Поле ссылка является обязательным",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        default: [],
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("card", cardSchema);
