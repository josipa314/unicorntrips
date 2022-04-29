const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(

  {
    email: {
      type: String,
      required: [true, "Email is required"],
      // unique: true -> Ideally, should be unique, but its up to you
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, "Password required"]
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
);

const User = model("User", userSchema);

module.exports = User;
