const { AuthenticationError, UserInputError } = require("apollo-server");

const Quiz = require("../../models/Quiz");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    createComment: async (_, { quizId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "comment cannot be empty",
          },
        });
      }
      const quiz = await Quiz.findById(quizId);

      if (quiz) {
        quiz.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await quiz.save();
        return quiz;
      } else throw new UserInputError("Quiz not found");
    },
    deleteComment: async (_, { quizId, commentId }, context) => {
      const { username } = checkAuth(context);
      const quiz = await Quiz.findById(quizId);

      if (quiz) {
        const commentIndex = quiz.comments.findIndex((c) => c.id === commentId);

        if (quiz.comments[commentIndex].username === username) {
          quiz.comments.splice(commentIndex, 1);
          await quiz.save();
          return quiz;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Quiz not found");
      }
    },
    likeQuiz: async (_, { quizId }, context) => {
      const { username } = checkAuth(context);
      const quiz = await Quiz.findById(quizId);
      if (quiz) {
        if (quiz.likes.find((like) => like.username === username)) {
          //quiz has already been liked, so unlike it
          quiz.likes = quiz.likes.filter((like) => like.username !== username);
        } else {
          //like the quiz
          quiz.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        //save either case
        await quiz.save();
        return quiz;
      } else {
        throw new UserInputError("Quiz not found");
      }
    },
  },
};
