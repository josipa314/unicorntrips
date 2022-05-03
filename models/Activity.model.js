const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const activitySchema = new Schema({
  title: String,

  imageFile: {
    type: String,
    default: "/images/let-us-travel.jpg",
  },
  description: String,
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
  },
  location: String,
  difficulty: String,
  rating: Number,
  price: Number,
});

const Activity = model("Activity", activitySchema);

module.exports = Activity;
