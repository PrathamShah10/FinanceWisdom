import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation example($newUserDetails: UserInput!) {
    addUser(newUserDetails: $newUserDetails) {
      name
      age
    }
  }
`;
export const SIGNIN_USER = gql`
  mutation example($signDetails: signInput!) {
    signInUser(signDetails: $signDetails) {
      token
      userDetails {
        name
        age
        _id
      }
    }
  }
`;
export const CREATE_QUOTE = gql`
  mutation quote($name: String!) {
    createQuote(name: $name) {
      description
      by
    }
  }
`;
