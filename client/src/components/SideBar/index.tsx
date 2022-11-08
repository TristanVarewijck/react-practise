import "./style.css";
import Note from "./Note";
import React from "react";

interface SideBarProps {
  notes: any;
  createNewNote: any;
  findCurrentNote: any;
  setCurrentNoteId: any;
  updateNote: any;
  isSubmit: boolean;
  setIsSubmit: any;
}

const SideBar = ({
  notes,
  createNewNote,
  findCurrentNote,
  setCurrentNoteId,
  updateNote,
  isSubmit,
  setIsSubmit,
}: SideBarProps): JSX.Element => {
  const notesElements = notes.map((note: any) => {
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
