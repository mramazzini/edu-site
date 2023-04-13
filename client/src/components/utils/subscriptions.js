import { gql } from "@apollo/client";

export const COUNT_WEBSOCKET = gql`
  subscription {
    loginCountSubscription
  }
`;
