const mongoose = require("mongoose");
const mongooseUrlSlugs = require("mongoose-url-slugs");
const Schema = mongoose.Schema;
const bannerSchema = mongoose.Schema(
  {
    bannerPhoto: {
      type: String,
    },
    link: {
      type: String,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    isDeleted: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
bannerSchema.plugin(
  mongooseUrlSlugs("displayName", { field: "slug", update: true })
);
module.exports = mongoose.model("banner", bannerSchema);
