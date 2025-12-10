const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id_: String,
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
});

const User = mongoose.model("User", userSchema, "Users");
module.exports = User;