import { gql, useQuery } from "@apollo/client";

const ALL_NOTES = gql`
  query allNotes {
    getNotes {
      id
      title
      author
      content
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(ALL_NOTES);
  if (loading) return <h1>loading</h1>;
  if (error) return <h1>Error</h1>;
  console.log(data);
  return <h1>Query Sucessfull</h1>;
}
