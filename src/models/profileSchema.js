const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  dogecoins: { type: Number, default: 1000 },
  dogebank: { type: Number },
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;