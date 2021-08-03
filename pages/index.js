import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";

//To Add Optimistic Response, Extend Schema

const NOTE_DETAILS = gql`
  fragment NoteDetails on Note {
    id
    title
    author
    content
  }
`;

const ALL_NOTES = gql`
  query allNotes {
    getNotes {
      ...NoteDetails
    }
  }
  ${NOTE_DETAILS}
`;

const ADD_NOTE = gql`
  mutation addItem(
    $addNoteTitle: String
    $addNoteAuthor: String
    $addNoteContent: String
  ) {
    addNote(
      title: $addNoteTitle
      author: $addNoteAuthor
      content: $addNoteContent
    ) {
      ...NoteDetails
    }
  }
  ${NOTE_DETAILS}
`;

export default function Home() {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [content, setContent] = React.useState("");

  const { data, loading, error } = useQuery(ALL_NOTES);

  const [createNote, newNote] = useMutation(ADD_NOTE, {
    update(cache, { data: { addNote } }) {
      const { getNotes } = cache.readQuery({ query: ALL_NOTES });

      cache.writeQuery({
        query: ALL_NOTES,
        data: { getNotes: [addNote, ...getNotes] },
      });
    },
  });

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>Error</h1>;

  const display = data.getNotes.map((el, id) => {
    return (
      <div
        style={{
          width: "20rem",
          border: "1px solid black",
          marginTop: "20px",
          marginBottom: "20px",
        }}
        key={el.id}
      >
        <p>Title: {el.title}</p>
        <p>Content: {el.content}</p>
        <p>Author: {el.author}</p>
      </div>
    );
  });

  const handleSubmit = (event) => {
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
        },
      },
    });
    setTitle("");
    setContent("");
    setAuthor("");
    event.preventDefault();
  };

  return (
    <div>
      <h3>Add Note</h3>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>Content: </label>
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <label>Author: </label>
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {display}
      </div>
    </div>
  );
}
