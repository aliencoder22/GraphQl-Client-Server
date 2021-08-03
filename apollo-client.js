import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const typeDefs = gql`
  extend type Note {
    important: Boolean!
  }
`;

const resolvers = {
  Note: {
    important: () => true,
  },
};

const delay = setContext(
  (request) =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success();
      }, 800);
    })
);

const http = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const link = ApolloLink.from([delay, http]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  typeDefs,
  resolvers,
});

export default client;
