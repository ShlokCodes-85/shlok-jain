import { Content } from '../models/Content.js';
import { slugify } from '../utils/helpers.js';

// Create content
export const createContent = async (req, res) => {
  try {
    const { title, description, content, category, tags, image } = req.body;

    if (!title || !description || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and content',
      });
    }

    const contentData = {
      title,
      slug: slugify(title),
      description,
      content,
      category,
      tags,
      image,
      author: req.user.id,
    };

    const newContent = await Content.create(contentData);

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: newContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all content
export const getAllContent = async (req, res) => {
  try {
    const { category, isPublished, featured, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';
    if (featured !== undefined) filter.featured = featured === 'true';

    const skip = (page - 1) * limit;

    const content = await Content.find(filter)
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Content.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: content.length,
      total,
      pages: Math.ceil(total / limit),
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get content by ID
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'username email');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get content by slug
export const getContentBySlug = async (req, res) => {
  try {
    const content = await Content.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'username email');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update content
export const updateContent = async (req, res) => {
  try {
    const { title, description, content, category, tags, image, isPublished, featured } = req.body;

    let updateData = {
      title,
      description,
      content,
      category,
      tags,
      image,
      isPublished,
      featured,
    };

    if (title) {
      updateData.slug = slugify(title);
    }

    if (isPublished && !content.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'username email');

    if (!updatedContent) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      data: updatedContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete content
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Content deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Publish content
export const publishContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      {
        isPublished: true,
        publishedAt: new Date(),
      },
      { new: true }
    ).populate('author', 'username email');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Content published successfully',
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get content statistics
export const getContentStats = async (req, res) => {
  try {
    const totalContent = await Content.countDocuments();
    const publishedContent = await Content.countDocuments({ isPublished: true });
    const draftContent = await Content.countDocuments({ isPublished: false });
    const totalViews = await Content.aggregate([
      {
        $group: {
          _id: null,
          views: { $sum: '$views' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalContent,
        publishedContent,
        draftContent,
        totalViews: totalViews[0]?.views || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
