const { gql } = require('apollo-server-express');

// Check if it should be "Number" or "Int" for data type
// Refer to 21-Mern (Module 24)
const typeDefs = gql`
  type User {
    _id: ID

    email: String
    password: String
  }
  type SnakePlayer {
    _id: ID
    username: String
    score: Int
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: String): User
    snakeLeaderBoard: [SnakePlayer]
    getCourse(courseName: String): Course
    getLoginCount: Int
  }
  type Count {
    value: Int
  }

  type Lesson {
    name: String
    description: String
    sections: [Section]
  }
  type Section {
    name: String
    description: String
  }
  type Course {
    name: String
    lessons: [Lesson]
  }
  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSnakePlayer(username: String!, score: Int!): SnakePlayer
    incrementLoginCount: Int
  }
  type Subscription {
    loginCountSubscription: Int
  }
`;

module.exports = typeDefs;
