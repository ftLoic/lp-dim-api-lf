const mongoose = require("mongoose");

var songSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    artist: { type: Number, required: true, ref: "artists" },
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
