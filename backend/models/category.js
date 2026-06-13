import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      default: "expense",
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);