import "./style.css";

const Note = ({
  note,
  setCurrentNoteId,
  findCurrentNote,
  updateNote,
  isSubmit,
  setIsSubmit,
}) => {
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
            // localStorage.setItem();
          }}
        >
          <input
            name="title"
            style={{ display: "block", width: "100%" }}
            className="title-input"
            type="text"
            onChange={(event) => {
              updateNote(event.target.value, "title");
            }}
            value={note.title || ""}
            disabled={isSubmit ? true : false}
          />

          {isSubmit ? (
            <input
              type="button"
              onClick={() => {
                setIsSubmit(false);
              }}
              value="edit"
            />
          ) : (
            <input
              type="submit"
              onClick={() => {
                setIsSubmit(true);
              }}
              value="save"
            />
          )}

          <input
            type="button"
            onClick={() => {
              setIsSubmit(false);
            }}
            value="delete"
          />
        </form>
      </div>
    </>
  );
};

export default Note;
