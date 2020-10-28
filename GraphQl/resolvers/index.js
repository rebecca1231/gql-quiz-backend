const userResolver = require("./users");
const commentResolver = require("./comments");
const quizResolver = require("./quizzes");
const quizItemResolver = require("./quizItems");
const movieResolver = require('./movies')

module.exports = {
  Quiz: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },

  Query: {
    ...quizResolver.Query,
    ...movieResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...commentResolver.Mutation,
    ...quizResolver.Mutation,
    ...quizItemResolver.Mutation,
  },
  Subscription: {
    ...quizResolver.Subscription,
  },
};
