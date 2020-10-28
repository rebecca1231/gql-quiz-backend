const { AuthenticationError, UserInputError } = require("apollo-server");

const Quiz = require("../../models/Quiz");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    createQuizItem: async (_, { quizId, question, answer }, context) => {
      const { username } = checkAuth(context);
      if (question.trim() === "") {
        throw new UserInputError("Empty question", {
          errors: {
            body: "Question cannot be empty",
          },
        });
      }
      if (answer.trim() === "") {
        throw new UserInputError("Empty answer", {
          errors: {
            body: "Answer cannot be empty",
          },
        });
      }
      const quiz = await Quiz.findById(quizId);

      if (quiz) {
        quiz.items.push({
          question,
          answer,
          createdAt: new Date().toISOString(),
        });
        await quiz.save();
        return quiz;
      } else throw new UserInputError("Quiz not found");
    },/*
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          //post has already been liked, so unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //like the post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        //save either case
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },*/
  },
};
