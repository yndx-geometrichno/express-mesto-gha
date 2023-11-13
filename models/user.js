const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlegth: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlegth: 2,
    maxlength: 30,
  },
  avatar: String,
});

module.exports = model('user', userSchema);
