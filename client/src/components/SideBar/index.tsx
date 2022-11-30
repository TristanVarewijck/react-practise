import "./style.css";
import { noteProps } from "../../types";
import React from "react";
import NoteInputTitle from "../NoteInputTitle";
import { differenceBetweenTimestamps, sortNotesByTimestamp } from "../../utils/timestampActions.util";
import { FilePlus} from 'react-feather';
import { setDocument } from "../../firebaseService/setDocument";

export interface sideBarProps {
  notes: noteProps[];
  activeNote: string; 
  setActiveNote: (id: string) => void;
}

// setTime;
const SideBar = ({
  notes,
  activeNote,
  setActiveNote,
}: sideBarProps): JSX.Element => {
  const sortedNotes = sortNotesByTimestamp(notes);
  const notesElements = sortedNotes.map((note) => {
     
    return (
      <li key={note.id}>
        <div
          className={`note ${note.id === activeNote || note.id === localStorage.getItem("currentNoteId") ? "selected-note" : ""}`}
          onClick={() => {
            localStorage.setItem("currentNoteId", note.id);
            setActiveNote(note.id);
          }}
        >
          <small>{differenceBetweenTimestamps(note.date) }</small>
          {note.id === activeNote ? (
            <NoteInputTitle
              notes={notes}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
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
          onClick={ async (e)  => {
            e.preventDefault();
            const newNoteId = await setDocument("notes");
            localStorage.setItem("currentNoteId", newNoteId);
            setActiveNote(newNoteId);
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
