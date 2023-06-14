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
