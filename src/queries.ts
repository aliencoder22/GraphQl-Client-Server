import gql from "graphql-tag";

export const NOTE_DETAILS = gql`
  fragment NoteDetails on Note {
    id
    title
    author
    content
    important @client
  }
`;

export const ALL_NOTES = gql`
  query allNotes {
    getNotes {
      ...NoteDetails
    }
  }
  ${NOTE_DETAILS}
`;

export const ADD_NOTE = gql`
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
