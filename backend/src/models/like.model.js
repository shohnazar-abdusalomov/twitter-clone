const { pool } = require('../config/db');

const likeModel = {
  async toggle(userId, postId) {
    const existing = await pool.query(
      'SELECT * FROM likes WHERE user_id = $1 AND post_id = $2',
      [userId, postId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        'DELETE FROM likes WHERE user_id = $1 AND post_id = $2',
        [userId, postId]
      );
      return { liked: false };
    } else {
      await pool.query(
        'INSERT INTO likes (user_id, post_id) VALUES ($1, $2)',
        [userId, postId]
      );
      return { liked: true };
    }
  },

  async countByPostId(postId) {
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM likes WHERE post_id = $1',
      [postId]
    );
    return parseInt(result.rows[0].count);
  },

  async isLiked(userId, postId) {
    const result = await pool.query(
      'SELECT * FROM likes WHERE user_id = $1 AND post_id = $2',
      [userId, postId]
    );
    return result.rows.length > 0;
  }
};

module.exports = likeModel;