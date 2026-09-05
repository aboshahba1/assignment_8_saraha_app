import userModel from "./user.models.js";
import Post from "./post.models.js";
import Comment from "./comment.models.js";
userModel.hasMany(Post, {
    foreignKey: "userId"
});

Post.belongsTo(userModel, {
    foreignKey: "userId"
});
userModel.hasMany(Comment, {
    foreignKey: "userId"
});

Comment.belongsTo(userModel, {
    foreignKey: "userId"
});

Post.hasMany(Comment, {
    foreignKey: "postId"
});

Comment.belongsTo(Post, {
    foreignKey: "postId"
});

