const express = require('express');
const router = express.Router();

const controller = require('../controllers/commentController');

// Authentication Middleware
const authMiddleware = require('../middlewares/authMiddleware');

// Create Comment
router.post('/:postId', authMiddleware.authenticated, controller.create);

module.exports = router;