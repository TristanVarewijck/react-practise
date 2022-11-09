import "./style.css";
import Note from "./Note";
import { noteProps } from "../../pages/notes";
import React from "react";

export interface sideBarProps {
  notes: noteProps[];
  createNewNote: () => void;
  findCurrentNote: () => noteProps;
  setCurrentNoteId: (id: string) => void;
  updateNote: (text: string, type: string) => void;
  setIsSubmit: (isSubmit: boolean) => void;
  isSubmit: boolean;
}

// setTime;

const SideBar = ({
  notes,
  createNewNote,
  findCurrentNote,
  setCurrentNoteId,
  updateNote,
  isSubmit,
  setIsSubmit,
}: sideBarProps): JSX.Element => {
  const notesElements = notes.map((note) => {
    return (
      <li key={note.id}>
        <Note
          note={note}
          findCurrentNote={findCurrentNote}
          setCurrentNoteId={setCurrentNoteId}
          updateNote={updateNote}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
        />
      </li>
    );
  });

  return (
    <>
      <div className="sidebar">
        <h1>My Notes</h1>
        <button onClick={createNewNote}>
          <img src="/assets/icons/plus-i.svg" alt="add-icon" />
          <p>Add new Note</p>
        </button>
        <ul>{notesElements}</ul>
      </div>
    </>
  );
};

export default SideBar;
