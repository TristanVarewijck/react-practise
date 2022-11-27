import "./style.css";
import { noteProps } from "../../pages/notes";
import React from "react";
import { createNewNote } from "../../utils/noteActions.util";
import NoteInputTitle from "../NoteInputTitle";
import { differenceBetweenTimestamps, sortNotesByTimestamp } from "../../utils/timestampActions.util";

export interface sideBarProps {
  notes: noteProps[];
  setNotes: (notes: noteProps[]) => void;
  setCurrentNoteId: (id: string) => void;
  currentNoteId: string;
}

// setTime;
const SideBar = ({
  notes,
  setNotes,
  setCurrentNoteId,
  currentNoteId,
}: sideBarProps): JSX.Element => {
  const sortedNotes = sortNotesByTimestamp(notes);
  const notesElements = sortedNotes.map((note) => {
    return (
      <li key={note.id}>
        <div
          className={`note ${note.id === currentNoteId ? "selected-note" : ""}`}
          onClick={() => setCurrentNoteId(note.id)}
        >
          <small>{differenceBetweenTimestamps(note.date)}</small>
          {note.id === currentNoteId ? (
            <NoteInputTitle
              notes={notes}
              currentNoteId={currentNoteId}
              setCurrentNoteId={setCurrentNoteId}
              setNotes={setNotes}
            />
          ) : (
            <h3>{note.title}</h3>
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
