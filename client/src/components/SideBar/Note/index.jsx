import { useRef, useState } from "react";
import "./style.css";

const Note = ({ note, setCurrentNoteId, findCurrentNote, updateNote }) => {
  const titleInput = useRef(null);
  const [isSubmit, setIsSubmit] = useState(true);

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
            ref={titleInput}
            value={note.title || ""}
            disabled
          />

          {isSubmit ? (
            <input
              type="button"
              onClick={() => {
                titleInput.current.removeAttribute("disabled", "");
                setIsSubmit(false);
              }}
              value="edit"
            />
          ) : (
            <input
              type="submit"
              onClick={() => {
                titleInput.current.setAttribute("disabled", "");
                setIsSubmit(true);
              }}
              value="save"
            />
          )}

          <input
            type="button"
            onClick={() => {
              titleInput.current.removeAttribute("disabled", "");
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
