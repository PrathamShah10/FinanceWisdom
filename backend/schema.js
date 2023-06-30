export const typeDefs = `#graphql

type Query {
 user(_id:ID!): User
 business(_id:ID!): BusinessPerson
}
type Mutation {
    addUser(newUserDetails: UserInput!) : User
    signInUser(signDetails: signInput!): UserToken
    signInBuisness(signDetails: signInput!): BuisnessToken
    addBuisnessMan(newUserDetails: BuisnessInput!) : BusinessPerson
}
type User {
    _id: ID!
    name: String
    email: String
    username: String
    password: String
    buisnessMan: BusinessPerson
}
type BusinessPerson {
    _id: ID!
    name: String
    email: String
    username: String
    password: String
    customers: [User]
}
type UserToken {
    token: String
    userDetails: User
    isCustomer: Boolean
}
type BuisnessToken {
    token: String
    userDetails: BusinessPerson
    isCustomer: Boolean
}
input signInput {
    username: String!
    password: String!
}
input UserInput {
    name: String!
    email: String!
    username: String!
    password: String!
    buisnessMan: String!
}
input BuisnessInput {
    name: String!
    email: String!
    username: String!
    password: String!
}
`;
