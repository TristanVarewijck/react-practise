import "./style.css";
import { noteProps } from "../../pages/notes";
import React from "react";
import { createNewNote } from "../../utils/noteActions.util";

export interface sideBarProps {
  notes: noteProps[];
  setNotes: (notes: noteProps[]) => void;
  setCurrentNoteId: (id: string) => void;
  currentNoteId: string;
  updateNote: (text: string, type: string) => void;
  setIsSubmit: (isSubmit: boolean) => void;
  isSubmit: boolean;
}

// setTime;
const SideBar = ({
  notes,
  setNotes,
  setCurrentNoteId,
  currentNoteId,
  updateNote,
  isSubmit,
  setIsSubmit,
}: sideBarProps): JSX.Element => {
  const notesElements = notes.map((note) => {
    return (
      <li key={note.id}>
        <div
          className={`note ${note.id === currentNoteId ? "selected-note" : ""}`}
          onClick={() => setCurrentNoteId(note.id)}
        >
          <small>{note.date}</small>
          {note.id === currentNoteId ? (
            <form
              onSubmit={(event): void => {
                event.preventDefault();
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
                value={note.title || ""}
                disabled
              />
            </form>
          )}
        </div>
      </li>
    );
  });

  return (
    <>
      <div className="sidebar">
        <h1>My Notes</h1>
        <button
          onClick={() => {
            const newNote = createNewNote();
            setNotes([...notes, newNote]);
            setCurrentNoteId(newNote.id);
          }}
        >
          <img src="/assets/icons/plus-i.svg" alt="add-icon" />
          <p>Add new Note</p>
        </button>
        <ul>{notesElements}</ul>
      </div>
    </>
  );
};

export default SideBar;
