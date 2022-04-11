const mongoose = require("mongoose");

const incidentSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["Update", "Question", "Positive Experience", "Negative Incident"],
    },
    description: {
      type: String,
      required: [true, "Please provide a brief description of the incident"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Incident", incidentSchema);