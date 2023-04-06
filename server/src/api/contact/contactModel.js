import mongoose from "mongoose";

const { model, Schema } = mongoose;

const contactSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: false },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Contact", contactSchema);
