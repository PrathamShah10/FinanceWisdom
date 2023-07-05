export const typeDefs = `#graphql
union UserOrBusinessPerson = User | BusinessPerson
type Query {
 user(_id:ID!): User
 business(_id:ID!): BusinessPerson
 getAllUserData(_id:ID!): AllUserData
 getAllBusinessData(_id:ID!): AllBuisnessData
 getAllBusinessMen: [BusinessPerson]
}
type Mutation {
    addUser(newUserDetails: UserInput!) : User
    signInUser(signDetails: signInput!): UserToken
    signInBuisness(signDetails: signInput!): BuisnessToken
    addBuisnessMan(newUserDetails: BuisnessInput!) : BusinessPerson
    updateEconomics(economicDetails: EconomicsInput!): Economics
    addMessage(messageDetails: MessagingInput!): [Messaging]
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
type AllUserData {
    user: User
    visuals: Economics
    chats: [Messaging]
}
type AllBuisnessData {
    user: BusinessPerson
    chats: [Messaging]
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
type Messaging {
    _id: ID!
    sender: String
    reciever: String
    message: String
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
input MessagingInput {
    sender: String!
    reciever: String!
    message: String!
}
`;
