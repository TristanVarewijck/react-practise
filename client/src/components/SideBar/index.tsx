import "./style.css";
import { noteProps } from "../../pages/notes";
import React from "react";
import { createNewNote, updateNote } from "../../utils/noteActions.util";
import NoteInputTitle from "../NoteInputTitle";

export interface sideBarProps {
  notes: noteProps[];
  setNotes: (notes: noteProps[]) => void;
  setCurrentNoteId: (id: string) => void;
  currentNoteId: string;
  setIsSubmit: (isSubmit: boolean) => void;
  isSubmit: boolean;
}

// setTime;
const SideBar = ({
  notes,
  setNotes,
  setCurrentNoteId,
  currentNoteId,
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
            <NoteInputTitle
              notes={notes}
              currentNoteId={currentNoteId}
              isSubmit={isSubmit}
              setNotes={setNotes}
              setIsSubmit={setIsSubmit}
            />
          ) : (
            <h6>{note.title}</h6>
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
