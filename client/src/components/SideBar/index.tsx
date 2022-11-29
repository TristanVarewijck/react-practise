import "./style.css";
import { noteProps } from "../../pages/notes";
import React from "react";
import { createNewNote } from "../../utils/noteActions.util";
import NoteInputTitle from "../NoteInputTitle";
import { differenceBetweenTimestamps, sortNotesByTimestamp } from "../../utils/timestampActions.util";
import { FilePlus} from 'react-feather';

export interface sideBarProps {
  notes: noteProps[];
  setCurrentNoteId: (id: string) => void;
  currentNoteId: string;
}

// setTime;
const SideBar = ({
  notes,
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
          <small>{differenceBetweenTimestamps(note.date) }</small>
          {note.id === currentNoteId ? (
            <NoteInputTitle
              notes={notes}
              currentNoteId={currentNoteId}
              setCurrentNoteId={setCurrentNoteId}
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
            setCurrentNoteId(newNote.id);
          }}
        >
          <FilePlus width="22px"/>
          <p>Add new Note</p>
        </button>

        {
          notes.length > 0 ? (
            <ul>{notesElements}</ul>
          ) : (
            <div className="emptyState">
              <p>You have no notes</p>
             </div>
          )
        }
        
      </div>
    </>
  );
};

export default SideBar;
