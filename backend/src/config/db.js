require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

const initDatabase = async () => {
  let client;
  try {
    client = await pool.connect();
    await client.query(`DROP TABLE IF EXISTS likes CASCADE`);
    await client.query(`DROP TABLE IF EXISTS posts CASCADE`);
    await client.query(`DROP TABLE IF EXISTS users CASCADE`);
    
    await client.query(`CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    await client.query(`CREATE TABLE posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    await client.query(`CREATE TABLE likes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, post_id)
      )`);
    await client.query(`CREATE INDEX idx_posts_user_id ON posts(user_id)`);
    await client.query(`CREATE INDEX idx_posts_created_at ON posts(created_at DESC)`);
    await client.query(`CREATE INDEX idx_likes_post_id ON likes(post_id)`);
    await client.query(`CREATE INDEX idx_likes_user_id ON likes(user_id)`);
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error.message);
  } finally {
    if (client) client.release();
  }
};

module.exports = { pool, initDatabase };
