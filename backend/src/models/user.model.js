const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

const userModel = {
  async create(userData) {
    try {
      const { name, username, password } = userData;
      console.log('Creating user:', { name, username });
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed');
      const result = await pool.query(
        'INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING id, name, username, created_at',
        [name, username, hashedPassword]
      );
      console.log('User created:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in userModel.create:', error.message);
      throw error;
    }
  },

  async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query('SELECT id, name, username, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  async findByIdWithPassword(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
};

module.exports = userModel;