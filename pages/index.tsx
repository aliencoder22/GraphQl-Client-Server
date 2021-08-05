import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import Display from "../src/components/display";
import Form from "../src/components/form";
import * as queries from "../src/queries";

interface Notes {
  id: number;
  title: string;
  author: string;
  content: string;
  important: boolean;
}

interface NotesData {
  getNotes: Notes[];
}

export default function Home() {
  const { data, loading, error } = useQuery<NotesData>(queries.ALL_NOTES);

  const [createNote, newNote] = useMutation(queries.ADD_NOTE, {
    refetchQueries: [{ query: queries.ALL_NOTES }],
  });

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  const handleMutation = (title: String, author: String, content: String) => {
    createNote({
      variables: {
        addNoteTitle: title,
        addNoteAuthor: author,
        addNoteContent: content,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addNote: {
          __typename: "Note",
          id: "abcd",
          title,
          author,
          content,
          important: true,
        },
      },
    });
  };

  return (
    <div>
      <Form handleMutation={handleMutation} />
      <Display data={data}></Display>
    </div>
  );
}
