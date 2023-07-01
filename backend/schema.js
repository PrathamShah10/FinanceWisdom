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
    updateEconomics(economicDetails: EconomicsInput!): Economics
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
type Economics {
    _id: ID!
    expenses: [Int]
    savings: [Int]
    by: User
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
input EconomicsInput {
    _id: String!
    expenses: [Int]!
    savings: [Int]!
}
`;
