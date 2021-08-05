export default function Display({ data }) {
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
        <p>Important: {el.important ? "True" : "False"}</p>
      </div>
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {display}
    </div>
  );
}
