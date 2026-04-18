const express = require('express');
const likeController = require('../controllers/like.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/:postId', authMiddleware, likeController.toggle);

module.exports = router;