import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation example($newUserDetails: UserInput!) {
    addUser(newUserDetails: $newUserDetails) {
      name
      email
      username
      password
    }
  }
`;
export const SIGNUP_BUISNESSMAN = gql`
  mutation example($newUserDetails: BuisnessInput!) {
    addBuisnessMan(newUserDetails: $newUserDetails) {
      name
      email
      username
      password
    }
  }
`;
export const SIGNIN_USER = gql`
mutation signInUser($signDetails: signInput!) {
  signInUser(signDetails: $signDetails) {
    token
    userDetails {
      _id
      name
      email
      buisnessMan {
        name
        email
        username
        password
      }
    }
    isCustomer
  }
}
`;

export const SIGNIN_BUISNESSMAN = gql`
mutation signInBuisness($signDetails: signInput!) {
  signInBuisness(signDetails: $signDetails) {
    token
    userDetails {
      _id
      name
      email
      customers {
        name
        email
        username
      }
    }
    isCustomer
  }
}
`;

export const UPDATE_USERVISUAL = gql`
mutation updateEco($economicDetails: EconomicsInput!) {
  updateEconomics(economicDetails: $economicDetails) {
    _id
    expenses
    savings
    by {
      name
    }
  }
}
`