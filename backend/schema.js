export const typeDefs = `#graphql
type Query {
 user(_id:ID!): User
 business(_id:ID!): BusinessPerson
 getAllChats(_id:ID!): [Messaging]
 getAllUserData(_id:ID): AllUserData
 getAllBusinessData(_id:ID!): AllBuisnessData
 getAllBusinessMen: [BusinessPerson]
 getCustomerData(_id: String!): [Economics]
 getGoals(_id: String!): [String]
 getInvestments(_id: String!): [invest]
 getAllNotifications(_id: String!): [String]
}
type Mutation {
    addUser(newUserDetails: UserInput!) : User
    signInUser(signDetails: signInput!): UserToken
    signInBuisness(signDetails: signInput!): BuisnessToken
    addBuisnessMan(newUserDetails: BuisnessInput!) : BusinessPerson
    updateEconomics(economicDetails: EconomicsInput): Economics
    addMessage(messageDetails: [MessagingInput]!): [Messaging]
    changeGoals(goalDetails: GoalInput!): [String]
    addInvestment(investDetails: InvestInput!): [invest]
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
type invest {
    Itype: String
    amount:String
    duration: String
    returns: String
    customer: String
}
type goals {
    goal: String
    by: String
}
type Economics {
    _id: ID!
    expenses: [Int]
    by: User
    budgetExp: [Int]
    category: String
}
type AllUserData {
    user: User
    visuals: [Economics]
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
    receiver: String
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
    expenses: [Int]
    budgetExp: [Int]
    category: String
}
input InvestInput {
    Itype: String!
    amount:String!
    duration: String!
    returns: String!
    customer: String!
    isAdd: Boolean!
}
input GoalInput {
    goal: String!
    userid: String!
    isAdd: Boolean
}
input MessagingInput {
    sender: String!
    receiver: String!
    message: String!
}
`;
