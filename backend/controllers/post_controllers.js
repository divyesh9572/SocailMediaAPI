const Post = require("../models/Post");
const User = require("../models/User");


module.exports.createPost = async (req, res) => {
    try {

        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: "req.body. public_id",
                url: "req.body.url"
            },
            owner: req.user._id
        }
        const post = await Post.create(newPostData);

        const user = await User.findById(req.user._id);


        user.posts.push(post._id);
        await user.save();
        return res.status(201).json({
            success: true,
            post
        })

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports.deletePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (!post) {

            return res.status(404).json({
                success: true,
                message: "Post not Found"
            })
        }
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        await post.deleteOne();

        const user = await User.findById(req.user._id)
        const index = await user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Post Deleted"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}




module.exports.like_and_Unlike_Post = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (!post) {

            return res.status(404).json({
                success: true,
                message: "Post not Found"
            })
        }
        if (post.likes.includes(req.params.id)) {
            const index = post.likes.includes(req.params.id);
            post.likes.splice(index, 1);
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Post Unliked"
            })
        }
        else {

            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({
                success: false,
                message: "Post Liked"
            })


        }



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


module.exports.get_Post_Of_Following = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            owner: {
                $in: user.following,
            }
        })

        return res.status(200).json({
            success: true,
            posts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


module.exports.Updata_caption = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        post.caption = req.body.caption;
        await post.save();
        return res.status(200).json({
            success: true,
            message: "Post Updated"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.Comment_On_Post = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            })
        }
        let commentExistsIndex = -1;
        //checking if comment is already exists
        post.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) {
                commentExistsIndex = index;
            }
        })
        if (commentExistsIndex !== -1) {
            post.comments[commentExistsIndex].comment = req.body.comment;
            await post.save();
            return res.status(200).json({
                success: false,
                message: "Comment Updated"
            })

        } else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            });
            await post.save();
            return res.status(200).json({
                success: false,
                message: "Comment added"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports.delete_comment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            })
        }
        // when owner want to delete any post
        if (post.owner.toString() === req.user._id.toString()) {
            if (req.body.commentId == undefined) {
                return res.status(200).json({
                    success: false,
                    message: "Comment Id is required"
                })
            }
            post.comments.forEach((item, index) => {
                if (item._id.toString() === req.body.commentId.toString()) {
                    return post.comments.splice(index, 1);
                }
            })

            await post.save();
            return res.status(200).json({
                success: false,
                message: "Selected Comment Deleted"
            })
        } else {
            post.comments.forEach((item, index) => {
                if (item.user.toString() === req.user._id.toString()) {
                    return post.comments.splice(index, 1);
                }
            })
            await post.save();
            return res.status(200).json({
                success: false,
                message: "Your Comment has Deleted"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


