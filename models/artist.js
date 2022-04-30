const mongoose = require("mongoose");

var artistSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    genre: { type: String, required: true, enum: ["Blues", "Reggae", "Soul", "Jazz", "Folk", "Classique", "Chanson française", "Rock", "Metal", "Pop", "Rap", "Electro", "Funk"] },
    description: { type: String, required: false },
    image: { type: String, required: false },
});

artistSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

artistSchema.virtual("id").get(function () {
    return this._id;
});

// Export model
module.exports = mongoose.model("artists", artistSchema);
