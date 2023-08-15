import { gql } from "@apollo/client";

export const GET_ALL_USER_DATA = gql`
  query UserDetails($_id: ID!) {
    getAllUserData(_id: $_id) {
      user {
        name
        email
        username
        buisnessMan {
          _id
          name
        }
        _id
      }
      visuals {
        _id
        expenses
        budgetExp
        by {
          buisnessMan {
            name
          }
        }
        category
      }
      chats {
        sender
        reciever
        message
      }
    }
  }
`;

export const GET_ALL_BUISNESS_DATA = gql`
  query UserDetails($_id: ID!) {
    getAllBusinessData(_id: $_id) {
      user {
        name
        email
        username
        _id
        customers {
          name
          _id
          username
        }
      }
      chats {
        message
        sender
        reciever
      }
    }
  }
`;

export const GET_ALL_BUISNESSMEN = gql`
  query UserDetails {
    getAllBusinessMen {
      name
      email
      username
      _id
      customers {
        name
        _id
        username
      }
    }
  }
`;

export const GET_ALL_CHATS = gql`
  query chats($_id: ID!) {
    getAllChats(_id: $_id) {
      sender
      reciever
      message
    }
  }
`;

export const GET_CUSTOMER_DATA = gql`
query visuals($_id: String!) {
  getCustomerData(_id: $_id) {
    expenses
    budgetExp
    _id
    category
  }
}
`;