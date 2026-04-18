const likeModel = require('../models/like.model');

const likeController = {
  async toggle(req, res) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;

      const result = await likeModel.toggle(userId, postId);
      const likeCount = await likeModel.countByPostId(postId);

      res.json({
        liked: result.liked,
        likeCount
      });
    } catch (error) {
      console.error('Toggle like error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = likeController;