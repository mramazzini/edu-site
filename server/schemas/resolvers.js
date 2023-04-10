const { AuthenticationError } = require("apollo-server-express");
const { User, SnakePlayer } = require("../models");
require("dotenv").config();
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
      const myHeaders = new Headers();
      myHeaders.append("apikey", process.env.PROFANITY_API_KEY);

      const requestOptions = {
        method: "POST",
        redirect: "follow",
        headers: myHeaders,
        body: username,
      };

      const response = await fetch(
        "https://api.apilayer.com/bad_words?censor_character=*",
        requestOptions
      );
      const censoredResponse = await response.text();
      const censoredUsername = await JSON.parse(censoredResponse)
        .censored_content;

      const snakePlayer = await SnakePlayer.create({
        username: censoredUsername,
        score,
      });

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
