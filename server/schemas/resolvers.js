const { AuthenticationError } = require("apollo-server-express");
const { User, SnakePlayer } = require("../models");

const { signToken } = require("../utils/auth");
const fs = require("fs").promises;

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, args, context) => {
      if (args.id) {
        return User.findOne({ _id: args.id });
      }
      const id = context.user._id;
      return User.findOne({ _id: id });
    },
    snakeLeaderBoard: async () => {
      const players = await SnakePlayer.find().sort({ score: -1 });

      return players.slice(0, 5);
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };
    },
    addSnakePlayer: async (parent, { username, score }, context) => {
      const snakePlayer = await SnakePlayer.create({ username, score });
      return snakePlayer;
    },

    login: async (parent, { email, password }) => {
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.findOne({ username: email });
      }
      if (!user) {
        throw new AuthenticationError("No user found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
