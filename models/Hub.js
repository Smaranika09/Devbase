const mongoose = require("mongoose");

const hubSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    username: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      required: true
    },

    url: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    favorite: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps:true
  }
);

module.exports = mongoose.model("Hub", hubSchema);