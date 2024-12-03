const router = require('express').Router();
const { createComment, getCommentByBlogId, updateCommentById, deleteCommentById } = require('../api/v1/comment');
const validateToken = require('../middlewares/validateToken');

router.post('/', validateToken, createComment);
router.get('/:blogId', getCommentByBlogId);
router.put('/:commentId', validateToken, updateCommentById);
router.delete('/:commentId', validateToken, deleteCommentById);

module.exports = router;
