import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dummyUSerData, dummyQuotesData } from "./data.js";
const typeDefs = `#graphql
type Query {
 users: [User]
 user(id:ID!): User
 myQuote(id:ID!): [Quote]
 quotes: [Quote]
}
type User {
    id: ID!
    name: String
    age: Int
    quote: [Quote]
}
type Quote {
    name: String
    by: ID
}
`;
const resolvers = {
  Query: {
    users: () => {
      return dummyUSerData;
    },
    user: (_, args) => {
      return dummyUSerData.find(item=>item.id === args.id);
    },
    myQuote: (_, {id}) => {
      return dummyQuotesData.filter(item=>item.by === id);
    },
    quotes: () => {
      return dummyQuotesData;
    },
  },
  User: {
    quote: (parent, args) => {
        return dummyQuotesData.filter(item=>item.by === parent.id);
    }
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
