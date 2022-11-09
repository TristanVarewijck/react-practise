<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 95c5e20 (fix: add edit and save button to frontend (sidebar note))
import { useRef, useState } from "react";
import "./style.css";

const Note = ({ note, setCurrentNoteId, findCurrentNote, updateNote }) => {
  const titleInput = useRef(null);
  const [isSubmit, setIsSubmit] = useState(true);

  console.log(isSubmit);

<<<<<<< HEAD
=======
import "./style.css";

const Note = ({ note, setCurrentNoteId, findCurrentNote, updateNote }) => {
>>>>>>> 4ef6b0f (fix: make edits live-time in note and editor title)
=======
>>>>>>> 95c5e20 (fix: add edit and save button to frontend (sidebar note))
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
<<<<<<< HEAD

            localStorage.setItem();
>>>>>>> 4ef6b0f (fix: make edits live-time in note and editor title)
=======
            // localStorage.setItem();
>>>>>>> 95c5e20 (fix: add edit and save button to frontend (sidebar note))
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
<<<<<<< HEAD
            ref={titleInput}
            value={note.title || ""}
            disabled
=======
            value={note.title || ""}
>>>>>>> 4ef6b0f (fix: make edits live-time in note and editor title)
=======
            ref={titleInput}
            value={note.title || ""}
            disabled
>>>>>>> 95c5e20 (fix: add edit and save button to frontend (sidebar note))
          />

          {isSubmit ? (
            <input
<<<<<<< HEAD
=======
              className="edit-title"
>>>>>>> 95c5e20 (fix: add edit and save button to frontend (sidebar note))
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
<<<<<<< HEAD

          <input
            type="button"
            onClick={() => {
              titleInput.current.removeAttribute("disabled", "");
              setIsSubmit(false);
            }}
            value="delete"
          />
=======
>>>>>>> 95c5e20 (fix: add edit and save button to frontend (sidebar note))
        </form>
      </div>
    </>
  );
};

export default Note;
