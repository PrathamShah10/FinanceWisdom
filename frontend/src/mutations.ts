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
          _id
          name
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
          _id
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
      budgetExp
      by {
        name
      }
      category
    }
  }
`;
export const ADD_MESSAGES = gql`
  mutation addmsg($messageDetails: [MessagingInput]!) {
    addMessage(messageDetails: $messageDetails) {
      _id
      sender
      message
      receiver
    }
  }
`;
export const CHANGE_GOALS = gql`
mutation goalChange($goalDetails: GoalInput!) {
  changeGoals(goalDetails: $goalDetails)
}
`;
export const ADD_INVESTMENTS = gql`
mutation investments($investDetails: InvestInput!) {
  addInvestment(investDetails: $investDetails) {
    Itype
    duration
    amount
    returns
  } 
}
`;