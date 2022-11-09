<<<<<<< HEAD
import { useRef, useState } from "react";
import "./style.css";

const Note = ({ note, setCurrentNoteId, findCurrentNote, updateNote }) => {
  const titleInput = useRef(null);
  const [isSubmit, setIsSubmit] = useState(true);

  console.log(isSubmit);

=======
import "./style.css";

const Note = ({ note, setCurrentNoteId, findCurrentNote, updateNote }) => {
>>>>>>> 4ef6b0f (fix: make edits live-time in note and editor title)
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
<<<<<<< HEAD

            // store to localStorage
            // localStorage.setItem();
=======

            // store to localStorage

            localStorage.setItem();
>>>>>>> 4ef6b0f (fix: make edits live-time in note and editor title)
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
<<<<<<< HEAD
            ref={titleInput}
            value={note.title || ""}
            disabled
=======
            value={note.title || ""}
>>>>>>> 4ef6b0f (fix: make edits live-time in note and editor title)
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
