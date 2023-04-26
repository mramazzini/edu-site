const { AuthenticationError } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const fetch = require("node-fetch");
const sendMessage = require("../utils/discordWebHook");
const pubsub = new PubSub();
const COUNT_UPDATED = "LOGIN_COUNT_UPDATED";
const COUNT_KEY = "count";
const { User, SnakePlayer, Count } = require("../models");
require("dotenv").config();
const { signToken } = require("../utils/auth");
const { update } = require("../models/User");
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
    getLoginCount: async () => {
      const countDoc = await Count.findOne({ key: COUNT_KEY });
      if (!countDoc) {
        // If there's no count document in the database, initialize it with a count value of 0
        await Count.create({
          key: COUNT_KEY,
          value: 0,
        });
        return 0;
      }
      return countDoc.value;
    },
    getCourse: async (parent, { courseName }) => {
      let directoryPath;
      if (process.env.NODE_ENV === "production") {
        directoryPath = `server/courses/${courseName}.json`;
      } else {
        directoryPath = `./courses/${courseName}.json`;
      }
      let course = {
        name: courseName,
        lessons: [],
      };

      try {
        const data = await fs.readFile(directoryPath, "utf8");
        const lessons = JSON.parse(data).lessons;
        course.lessons = lessons;
        return course;
      } catch (error) {
        console.error(error);
        return course;
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };
    },
    addSnakePlayer: async (parent, { username, score }, context) => {
      let myHeaders = new fetch.Headers();
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
    incrementLoginCount: async () => {
      const countDoc = await Count.findOneAndUpdate(
        { key: COUNT_KEY },
        { $inc: { value: 1 } },
        { returnDocument: "after" }
      );
      const updatedCount = countDoc.value;

      pubsub.publish(COUNT_UPDATED, { countUpdated: updatedCount });
      sendMessage(updatedCount);
      return updatedCount;
    },
  },
  Subscription: {
    loginCountSubscription: {
      subscribe: () => pubsub.asyncIterator(COUNT_UPDATED),
      resolve: (payload) => {
        return payload.countUpdated;
      },
    },
  },
};

module.exports = resolvers;
