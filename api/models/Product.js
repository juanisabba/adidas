const { Schema, model } = require("mongoose");
const moment = require("moment")

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img1: {
      type: String,
      required: true,
    },
    img2: {
      type: String,
    },
    categories: {
      type: Array,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stars: {
      type: Number,
      required: true
    },
    comments: {
      type: Array,
      default: []
    },
    totalRatings: {
      type: Number,
      default: 2
    },
    time: {
      type: Number,
      default: moment(Date().now).format("YYYYMMDDHHmmss")
    }
  },
  { versionKey: false }
);

module.exports = model("Product", productSchema)
