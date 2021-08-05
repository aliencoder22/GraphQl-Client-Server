import styles from "../../styles/display.module.css";

type Notes = {
  id: number;
  title: string;
  author: string;
  content: string;
  important: boolean;
};

type Props = {
  data: { getNotes: Notes[] };
};

export default function Display({ data }: Props) {
  const display = data.getNotes.map((el, id) => {
    return (
      <div className={styles.item} key={el.id}>
        <p>Title: {el.title}</p>
        <p>Content: {el.content}</p>
        <p>Author: {el.author}</p>
        <p>Important: {el.important ? "True" : "False"}</p>
      </div>
    );
  });

  return <div className={styles.wrapper}>{display}</div>;
}
