const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  imageName: {
    type: String,
    required: true,
  },
  imageDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Image = mongoose.model("Image", imageSchema, "Images");

module.exports = Image;
