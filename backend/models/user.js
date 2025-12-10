const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id_: String,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "Users");
module.exports = User;