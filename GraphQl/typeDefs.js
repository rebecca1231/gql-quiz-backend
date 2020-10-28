const { gql } = require("apollo-server");

module.exports = gql`
  type Quiz {
    id: ID!
    title: String!
    items: [QuizItem]
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Movie {
    title: String!
    year: String!
    rated: String!
    runtime: String!
    actors: String!
    awards: String!
    director: String!
    plot: String!
    poster: String!
    genre: String!
    rating: String!
    metascore: String!
  }
  type QuizItem {
    question: String!
    answer: String!
    imdbId: String
    poster: String
  }

  input Item {
    question: String!
    answer: String!
    poster: String
  }
  type Score {
    correctCount: Int!
    questionCount: Int!
    quizTitle: String!
    username: String!
  }

  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getQuizzes: [Quiz]
    getQuiz(quizId: ID!): Quiz
    getMovieList(searchTerm: String!): Quiz
    getMovieDetail(searchTerm: String!): Movie
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createComment(quizId: ID!, body: String!): Quiz!
    deleteComment(quizId: ID!, commentId: ID!): Quiz!
    likeQuiz(quizId: ID!): Quiz!
    createQuiz(title: String!, items: [Item]): Quiz!
    createQuizItem(quizId: ID!, question: String!, answer: String!): Quiz!
    deleteQuiz(quizId: ID!): String!
  }
  type Subscription {
    newQuiz: Quiz!
  }
`;
