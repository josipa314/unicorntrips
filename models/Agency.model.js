const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const agencySchema = new Schema(
  {
    name: String,
    imageFile: {
      type: String,
      default: "default.jpg",
    },
    description: String,
    location: String,
    rating: Number,
  },
  {
    timestamps: true,
  }
);

const Agency = model("Agency", agencySchema);

module.exports = Agency;
