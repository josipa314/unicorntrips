const { default: mongoose } = require("mongoose");
const {Schema, model} = require("mongoose");

const agencySchema = new Schema(
    {
        name: String,
        description: String,
        location: String,
        rating: Number,
    }
);


const Agency = model("Owner", agencySchema);

module.exports = Owner;