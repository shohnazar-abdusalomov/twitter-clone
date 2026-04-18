const { pool } = require('../config/db');

const postModel = {
  async create(postData) {
    const { user_id, content, image_url } = postData;
    const result = await pool.query(
      'INSERT INTO posts (user_id, content, image_url) VALUES ($1, $2, $3) RETURNING *',
      [user_id, content, image_url]
    );
    return result.rows[0];
  },

  async findAll(currentUserId = null) {
    let query = `
      SELECT 
        p.id, p.content, p.image_url, p.created_at,
        u.id as user_id, u.name, u.username,
        COUNT(l.id) as like_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON l.post_id = p.id
      GROUP BY p.id, u.id
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query);
    
    if (currentUserId) {
      const likeStatus = await pool.query(
        'SELECT post_id FROM likes WHERE user_id = $1',
        [currentUserId]
      );
      const likedPosts = new Set(likeStatus.rows.map(row => row.post_id));
      return result.rows.map(row => ({
        ...row,
        isLiked: likedPosts.has(row.id)
      }));
    }
    
    return result.rows.map(row => ({
      ...row,
      isLiked: false
    }));
  },

  async findByUserId(userId) {
    const result = await pool.query(
      `SELECT 
        p.id, p.content, p.image_url, p.created_at,
        u.id as user_id, u.name, u.username,
        COUNT(l.id) as like_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON l.post_id = p.id
      WHERE p.user_id = $1
      GROUP BY p.id, u.id
      ORDER BY p.created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async findLikedByUserId(userId) {
    const result = await pool.query(
      `SELECT 
        p.id, p.content, p.image_url, p.created_at,
        u.id as user_id, u.name, u.username,
        COUNT(l.id) as like_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      JOIN likes likes ON likes.post_id = p.id
      LEFT JOIN likes l ON l.post_id = p.id
      WHERE likes.user_id = $1
      GROUP BY p.id, u.id
      ORDER BY likes.created_at DESC`,
      [userId]
    );
    
    const likeStatus = await pool.query(
      'SELECT post_id FROM likes WHERE user_id = $1',
      [userId]
    );
    const likedPosts = new Set(likeStatus.rows.map(row => row.post_id));
    
    return result.rows.map(row => ({
      ...row,
      isLiked: likedPosts.has(row.id)
    }));
  }
};

module.exports = postModel;