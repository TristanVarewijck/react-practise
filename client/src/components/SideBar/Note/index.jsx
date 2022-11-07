import "./style.css";

const Note = ({ note, setCurrentNoteId, findCurrentNote, updateNote }) => {
  return (
    <>
      <div
        className={`note ${
          note.id === findCurrentNote().id ? "selected-note" : ""
        }`}
        onClick={() => setCurrentNoteId(note.id)}
      >
        <small>{note.date}</small>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            // store to localStorage

            localStorage.setItem();
          }}
        >
          <input
            name="title"
            style={{ display: "block" }}
            className="title-input"
            type="text"
            onChange={(event) => {
              updateNote(event.target.value, "title");
            }}
            value={note.title || ""}
          />

          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default Note;
