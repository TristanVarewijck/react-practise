import "./style.css";

const Note = ({ content, setCurrentNoteId, findCurrentNote }) => {
  return (
    <>
      <div
        className={`note ${
          content.id === findCurrentNote().id ? "selected-note" : ""
        }`}
        onClick={() => setCurrentNoteId(content.id)}
      >
        <small>{content.date}</small>
        <h4>{content.body}</h4>
      </div>
    </>
  );
};

export default Note;
