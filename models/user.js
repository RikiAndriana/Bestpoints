const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMoongose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMoongose);

module.exports = mongoose.model("User", userSchema);
