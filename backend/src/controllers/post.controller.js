const postModel = require('../models/post.model');

const postController = {
  async create(req, res) {
    try {
      const { content } = req.body;
      const userId = req.user.id;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      if (!content || content.trim() === '') {
        return res.status(400).json({ error: 'Content is required' });
      }

      const post = await postModel.create({
        user_id: userId,
        content: content.trim(),
        image_url: imageUrl
      });

      const user = await require('../models/user.model').findById(userId);
      
      res.status(201).json({
        message: 'Post created successfully',
        post: {
          ...post,
          user_id: userId,
          name: user.name,
          username: user.username,
          like_count: 0,
          isLiked: false
        }
      });
    } catch (error) {
      console.error('Create post error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAll(req, res) {
    try {
      const currentUserId = req.user?.id || null;
      const posts = await postModel.findAll(currentUserId);
      res.json({ posts });
    } catch (error) {
      console.error('Get all posts error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getMyPosts(req, res) {
    try {
      const userId = req.user.id;
      const posts = await postModel.findByUserId(userId);
      res.json({ posts });
    } catch (error) {
      console.error('Get my posts error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getLikedPosts(req, res) {
    try {
      const userId = req.user.id;
      const posts = await postModel.findLikedByUserId(userId);
      res.json({ posts });
    } catch (error) {
      console.error('Get liked posts error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = postController;