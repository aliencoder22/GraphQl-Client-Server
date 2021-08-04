import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Note {
    id: ID
    title: String
    content: String
    author: String
  }
  type Query {
    getNotes: [Note]
    getNote(id: ID!): Note
  }
  type Mutation {
    addNote(title: String, content: String, author: String): Note
  }
`;
export default typeDefs;
