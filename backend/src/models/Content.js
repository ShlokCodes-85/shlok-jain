import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    category: {
      type: String,
      enum: ['project', 'blog', 'portfolio', 'skill', 'experience', 'other'],
      default: 'other',
    },
    image: {
      type: String,
      default: null,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    metadata: {
      metaDescription: String,
      metaKeywords: [String],
      ogImage: String,
    },
  },
  { timestamps: true }
);

// Index for faster queries
contentSchema.index({ category: 1, isPublished: 1 });
contentSchema.index({ author: 1 });
contentSchema.index({ slug: 1 });

export const Content = mongoose.model('Content', contentSchema);
