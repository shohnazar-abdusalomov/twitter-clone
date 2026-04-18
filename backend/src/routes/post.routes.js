const express = require('express');
const postController = require('../controllers/post.controller');
const { authMiddleware, optionalAuth } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), postController.create);
router.get('/', optionalAuth, postController.getAll);
router.get('/my-posts', authMiddleware, postController.getMyPosts);
router.get('/liked', authMiddleware, postController.getLikedPosts);

module.exports = router;