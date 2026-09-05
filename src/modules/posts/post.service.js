import Post from "../../DB/models/post.models.js";
import userModel from "../../DB/models/user.models.js";
import Comment from "../../DB/models/comment.models.js";
import { Sequelize } from "sequelize";


//  part 2 B  question 1 create new post 
export const createPost = async (req, res, next) => {
    try {
        const { title, content, userId } = req.body;

        const post = new Post({
            title,
            content,
            userId
        });

        await post.save();

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
//  part 2 B  question 2 delete a post
export const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.userId !== userId) {
            return res.status(403).json({
                message: "You are not the owner of this post"
            });
        }

        await post.destroy();

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
//  part 2 B  question 3  get all post details
export const getPostsDetails = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            attributes: ["id", "title", "content", "createdAt"],

            include: [
                {
                    model: userModel,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: Comment,
                    attributes: ["id", "content", "createdAt"],

                    include: [
                        {
                            model: userModel,
                            attributes: ["id", "name"]
                        }
                    ]
                }
            ]
        });

        res.status(200).json({
            message: "Posts retrieved successfully",
            posts
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
//  part 2 B  question 4  get all post details
export const getPostsCommentCount = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            attributes: [
                "id",
                "title",
                [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"]
            ],
            include: [
                {
                    model: Comment,
                    attributes: []
                }
            ],
            group: ["post.id"]
        });

        res.status(200).json({
            message: "Posts with comment count",
            posts
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};