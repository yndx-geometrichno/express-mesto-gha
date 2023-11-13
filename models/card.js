const { Schema, model } = require("mongoose");
const { user } = require("./user");

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlegth: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: user.ObjectId,
  },
  likes: [
    {
      type: [user.ObjectId],
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("card", cardSchema);
