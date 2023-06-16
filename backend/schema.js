export const typeDefs = `#graphql

type Query {
 users: [User]
 user(_id:ID!): User
 myQuote(_id:ID!): [Quote]
 quotes: [QuoteWithName]
}
type Mutation {
    addUser(newUserDetails: UserInput!) : User
    signInUser(signDetails: signInput!): Token
    createQuote(name: String!): Quote
}
type User {
    _id: ID!
    name: String
    age: Int
    username: String
    password: String
    quote: [Quote]
}
type Quote {
    description: String
    by: ID
}
type QuoteWithName {
    description: String
    by: IdWithName
}
type IdWithName {
    name: String
    _id: ID
}
type Token {
    token: String
    userDetails: User
}
input signInput {
    username: String!
    password: String!
}
input UserInput {
    name: String!
    age: Int!
    username: String!
    password: String!
}
`;