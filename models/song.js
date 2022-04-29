const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

var formatDate = function () {
  return DateTime.fromJSDate(this.dateOfBirth).toISODate();
};

var songSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  singer: { type: Number, required: true, ref: "singers" },
});

songSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

songSchema.virtual("id").get(function () {
  return this._id;
});

// Export model
module.exports = mongoose.model("songs", songSchema);
