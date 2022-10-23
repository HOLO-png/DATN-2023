const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
  },
  coordinates: {
    type: [Number],
  },
});

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    label: {
      type: String,
      trim: true,
      enum: ["home", "office", "other"],
    },
    province: {
      type: Object,
      required: true,
    },
    ward: {
        type: Object,
        required: true,
    },
    district: {
        type: Object,
        required: true,
    },
    addressDetail: {
      type: String,
      trim: true,
    },
    geolocation: {
      type: pointSchema,
    },
    phoneno: {
      type: String,
      trim: true,
      max: 9999999999,
    },
    isActive: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
addressSchema.index({ geolocation: "2dsphere" });

module.exports = mongoose.model("address", addressSchema);
