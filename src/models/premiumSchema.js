const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  guildID: { type: String, require: true, unique: true },
  tier: {type: Number, require: true}
});

const model = mongoose.model("PremiumModels", profileSchema);

module.exports = model;