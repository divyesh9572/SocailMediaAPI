const express = require('express');
const { createPost, like_and_Unlike_Post, deletePost, get_Post_Of_Following, Updata_caption, Comment_On_Post, delete_comment } = require('../controllers/post_controllers');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.route("/post/upload").post( isAuthenticated, createPost);
router.route("/post/:id").get(isAuthenticated , like_and_Unlike_Post).put(isAuthenticated,Updata_caption).delete(isAuthenticated,deletePost);
router.route("/posts").get(isAuthenticated,get_Post_Of_Following);
router.route("/post/comment/:id").put(isAuthenticated,Comment_On_Post).delete(isAuthenticated, delete_comment);
module.exports = router;

