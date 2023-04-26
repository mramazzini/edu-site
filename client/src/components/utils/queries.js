import { gql } from '@apollo/client';

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

export const GET_COURSE = gql`
  query getCourse($courseName: String!) {
    getCourse(courseName: $courseName) {
      name
      lessons {
        name
        description
        sections {
          name
          description
        }
      }
    }
  }
`;
