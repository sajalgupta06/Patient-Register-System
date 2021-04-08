const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const psychiatristSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      max: 20,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
      max: 20,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },

    pincode: {
      type: Number,
    },
    state: {
      type: String,
    },
    patients: [{ type: ObjectId, ref: 'User'}],
  },
  { timestamps: true }
);




module.exports = mongoose.model("Psychiatrist", psychiatristSchema);
