const { AuthenticationError } = require("apollo-server");

const Quiz = require("../../models/Quiz");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getQuizzes() {
      try {
        const quizzes = await Quiz.find().sort({ createdAt: -1 });
        return quizzes;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getQuiz(_, { quizId }) {
      try {
        const quiz = await Quiz.findById(quizId);
        if (quiz) {
          return quiz;
        } else {
          throw new Error("quiz not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createQuiz(_, { title, items }, context) {
      const user = checkAuth(context);
      if (title.trim() === "") {
        throw new Error("quiz body cannot be empty");
      }

      const newQuiz = new Quiz({
        title,
        items,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const quiz = await newQuiz.save();

      context.pubsub.publish("NEW_quiz", {
        newQuiz: quiz,
      });

      return quiz;
    },
    async deleteQuiz(_, { quizId }, context) {
      const user = checkAuth(context);
      try {
        const quiz = await Quiz.findById(quizId);
        if (user.username === quiz.username) {
          await quiz.delete();
          return "Quiz was successfully deleted";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Subscription: {
    newQuiz: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_quiz"),
    },
  },
};
