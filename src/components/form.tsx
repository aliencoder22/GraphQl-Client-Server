import React from "react";

export default function Form({ handleMutation }) {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleMutation(title, author, content);
    setTitle("");
    setAuthor("");
    setContent("");
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
    </div>
  );
}
