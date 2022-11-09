<<<<<<< HEAD
import "./style.css";
import { noteProps } from "../../../pages/notes";
import React from "react";

interface NoteElementProps {
  note: noteProps;
  findCurrentNote: () => noteProps;
  setCurrentNoteId: (id: string) => void;
  updateNote: (text: string, type: string) => void;
  isSubmit: boolean;
  setIsSubmit: (isSubmit: boolean) => void;
}

const NoteElement = ({
=======
<<<<<<< HEAD
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
=======
import "./style.css";

const Note = ({
>>>>>>> 9ab3006847404bba9ccf8960604e1dc3be2bee86
  note,
  setCurrentNoteId,
  findCurrentNote,
  updateNote,
  isSubmit,
  setIsSubmit,
<<<<<<< HEAD
}: NoteElementProps): JSX.Element => {
=======
}) => {
>>>>>>> 46f159d (fix: sync live editing with editor)
>>>>>>> 9ab3006847404bba9ccf8960604e1dc3be2bee86
  return (
    <>
      <div
        className={`note ${
          note.id === findCurrentNote().id ? "selected-note" : ""
        }`}
        onClick={() => setCurrentNoteId(note.id)}
      >
        <small>{note.date}</small>
<<<<<<< HEAD

        {note.id === findCurrentNote().id ? (
          <form
            onSubmit={(event): void => {
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
              onChange={(event): void => {
                updateNote(event.target.value, "title");
              }}
              value={note.title || ""}
              disabled={isSubmit ? true : false}
            />

            {isSubmit ? (
              <input
                type="button"
                onClick={(): void => {
                  setIsSubmit(false);
                }}
                value="edit"
              />
            ) : (
              <input
                type="submit"
                onClick={(): void => {
                  setIsSubmit(true);
                }}
                value="save"
              />
            )}

            <input
              type="button"
              onClick={(): void => {
                setIsSubmit(false);
              }}
              value="delete"
            />
          </form>
        ) : (
          <form>
            <input
              name="title"
              style={{ display: "block", width: "100%" }}
              className="title-input"
              type="text"
              onChange={(event): void => {
                updateNote(event.target.value, "title");
              }}
              value={note.title || ""}
              disabled
            />
          </form>
        )}
=======
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
=======
            value={note.title || ""}
            disabled={isSubmit ? true : false}
>>>>>>> 46f159d (fix: sync live editing with editor)
          />

          {isSubmit ? (
            <input
<<<<<<< HEAD
=======
              className="edit-title"
>>>>>>> 95c5e20 (fix: add edit and save button to frontend (sidebar note))
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
<<<<<<< HEAD

          <input
            type="button"
            onClick={() => {
              setIsSubmit(false);
            }}
            value="delete"
          />
=======
>>>>>>> 95c5e20 (fix: add edit and save button to frontend (sidebar note))
        </form>
>>>>>>> 9ab3006847404bba9ccf8960604e1dc3be2bee86
      </div>
    </>
  );
};

<<<<<<< HEAD
export default NoteElement;
=======
export default Note;
>>>>>>> 9ab3006847404bba9ccf8960604e1dc3be2bee86
