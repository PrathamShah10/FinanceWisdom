import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
  query ExampleQuery {
    quotes {
      description
      by {
        name
        _id
      }
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query UserDetails($_id: ID!) {
    user(_id: $_id) {
      name
      age
      quote {
        description
      }
    }
  }
`;
