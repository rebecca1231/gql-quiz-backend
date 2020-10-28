const { model, Schema } = require("mongoose");

const quizSchema = new Schema({
  title: String,
  createdAt: String,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  items: [],
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
});

module.exports = model("Quiz", quizSchema);
