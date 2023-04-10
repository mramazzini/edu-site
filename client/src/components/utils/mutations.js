import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
export const ADD_SNAKE_PLAYER = gql`
  mutation addSnakePlayer($username: String!, $score: Int!) {
    addSnakePlayer(username: $username, score: $score) {
      username
      score
    }
  }
`;
