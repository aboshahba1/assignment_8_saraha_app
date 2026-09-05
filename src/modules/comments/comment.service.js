import Comment from "../../DB/models/comment.models.js";
import { Op } from "sequelize";
import userModel from "../../DB/models/user.models.js";
import Post from "../../DB/models/post.models.js";


//   part 2 c  question 1 create bulk of comments
export const createComments = async (req, res, next) => {
    try {
        const comments = await Comment.bulkCreate(req.body);

        res.status(201).json({
            message: "Comments created successfully",
            comments
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
//  part 2 c  question 2 update the content of a comment by id
export const updateComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;

        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({
                message: "You are not the owner of this comment"
            });
        }

        comment.content = content;

        await comment.save();

        res.status(200).json({
            message: "Comment updated successfully",
            comment
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
//  part 2 c  question 3 find comment or create it 
export const findOrCreateComment = async (req, res, next) => {
    try {
        const { postId, userId, content } = req.body;

        const [comment, created] = await Comment.findOrCreate({
            where: {
                postId,
                userId,
                content
            },
            defaults: {
                postId,
                userId,
                content
            }
        });

        res.status(created ? 201 : 200).json({
            message: created
                ? "Comment created successfully"
                : "Comment already exists",
            comment
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
//  part 2 c  question 4 find comment with specific word in their content
export const searchComments = async (req, res, next) => {
    try {
        const { word } = req.query;

        const comments = await Comment.findAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`
                }
            }
        });

        res.status(200).json({
            message: "Comments found",
            count: comments.length,
            comments
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
//  part 2 c  question 5 find the 3 most recent comments for  specific post
export const getNewestComments = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.findAll({
            where: {
                postId
            },
            order: [["createdAt", "DESC"]],
            limit: 3
        });

        res.status(200).json({
            message: "Newest comments retrieved successfully",
            comments
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
//  part 2 c  question 6 get specific comment by pk
export const getCommentDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id, {
            include: [
                {
                    model: userModel,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: Post,
                    attributes: ["id", "title", "content"]
                }
            ]
        });

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        res.status(200).json({
            message: "Comment details retrieved successfully",
            comment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};