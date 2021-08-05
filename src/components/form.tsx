import React from "react";
import styles from "../../styles/form.module.css";

type Props = {
  handleMutation: (title: string, author: string, content: string) => void;
};

export default function Form({ handleMutation }: Props) {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleMutation(title, author, content);
    setTitle("");
    setAuthor("");
    setContent("");
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h2>Add Note</h2>

      <form onSubmit={handleSubmit}>
        <ul className={styles.wrapper}>
          <li className={styles.formRow}>
            <label htmlFor="title">Title: </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </li>
          <li className={styles.formRow}>
            <label htmlFor="content">Content: </label>
            <input
              id="content"
              type="text"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </li>
          <li className={styles.formRow}>
            <label htmlFor="author">Author: </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </li>
          <li className={styles.formRow}>
            <button className={styles.button} type="submit">
              Submit
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
