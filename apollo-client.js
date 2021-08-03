import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";

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
});

export default client;
