import { gql } from "@apollo/client";

export const SNAKE_LEADERBOARD = gql`
  query getSnakeLeaderBoard {
    snakeLeaderBoard {
      _id
      username
      score
    }
  }
`;

export const GET_COUNT = gql`
  query {
    getLoginCount
  }
`;
