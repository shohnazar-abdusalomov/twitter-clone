const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

const authController = {
  async signup(req, res) {
    try {
      const { name, username, password } = req.body;

      if (!name || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      const existingUser = await userModel.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const user = await userModel.create({ name, username, password });
      
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User created successfully',
        user: { id: user.id, name: user.name, username: user.username },
        token
      });
    } catch (error) {
      console.error('Signup error:', error.message, error.stack);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const user = await userModel.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        user: { id: user.id, name: user.name, username: user.username },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getMe(req, res) {
    try {
      res.json({ user: req.user });
    } catch (error) {
      console.error('GetMe error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = authController;