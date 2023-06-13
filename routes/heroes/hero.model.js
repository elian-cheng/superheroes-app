const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HeroSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Hero nickname is required"]
    },
    real_name: {
      type: String,
      required: [true, "Hero real name is required"]
    },
    origin_description: {
      type: String,
      required: [true, "Hero description is required"]
    },
    superpowers: {
      type: String,
      required: [true, "Hero superpower is required"]
    },
    catch_phrase: {
      type: String,
      required: [true, "Hero catch phrase is required"]
    },
    images: {
      type: [String],
      required: [true, "Hero image is required"]
    }
  },
  { collection: "heroes" }
);

module.exports = mongoose.model("Hero", HeroSchema);
