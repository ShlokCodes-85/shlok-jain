import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    description: String,
    icon: String,
    color: String,
  },
  { timestamps: true }
);

export const Category = mongoose.model('Category', categorySchema);
