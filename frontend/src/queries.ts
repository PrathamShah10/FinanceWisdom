import { gql } from "@apollo/client";

export const GET_ALL_USER_DATA = gql`
  query UserDetails($_id: ID!) {
    getAllUserData(_id: $_id) {
      user {
        name
        email
        username
        _id
      }
      visuals {
        _id
        expenses
        savings
        by {
          buisnessMan {
            name
          }
        }
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
