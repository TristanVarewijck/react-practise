import React, { useState } from "react";
import "./style.css";
import {
  // updateNote,
  findCurrentNote,
} from "../../utils/noteActions.util";
import { noteProps } from "../../types"
import { Trash2, Edit3} from 'react-feather';
import {deleteDocument} from "../../firebaseService/deleteDocument"
interface NoteInputTitleProps {
  notes: any;
  activeNote: string;
  setActiveNote: (id: string) => void;
}

const NoteInputTitle = ({
  notes,
  activeNote,
  setActiveNote,
  // currentNoteId,
}: NoteInputTitleProps): JSX.Element => {
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const currentNote = findCurrentNote(notes, localStorage.getItem("currentNoteId") || "");
  const currentNoteIndex = notes.findIndex(
    (note: noteProps) => note.id === currentNote.id
  );
  const handleDelete = (e: any) => {
    e.stopPropagation();
        if (
          window.confirm(
            `Are you sure you want to delete this note?: ${currentNote.title}`
          )
        ) {


          // delete the document from firebase-firestore collection
          deleteDocument("notes", currentNote.id);

          if (notes.length >= 1 && currentNoteIndex === 0) {
            localStorage.setItem("currentNoteId", notes[0].id);
          } else if (notes.length >= 1 && currentNoteIndex !== notes.length) {
            localStorage.setItem("currentNoteId", notes[currentNoteIndex].id);
          } else if (currentNoteIndex === notes.length){
            localStorage.setItem("currentNoteId", notes[notes.length - 1].id);
          } else {
            localStorage.setItem("currentNoteId", "");
          }
        }
  }

  const handleTitleChange = (e: any) => {
    // const newTitle = e.target.value;
    // const updatedNotes = updateNote(currentNoteId, newTitle, "title", notes);
    // setNotes([...updatedNotes]);
  }
  
  return (
    <>
      <form
      className="note-title-form"
        onSubmit={(event): void => {
          event.preventDefault();
          setIsLocked(true)
        }}
        onDoubleClick={() => setIsLocked(false)}
      >
        <input
          name="title"
          style={{ display: "block", width: "100%" }}
          className="title-input"
          type="text"
          onChange={handleTitleChange}
          value={currentNote.title}
          disabled={isLocked}
        />
        <button
          type="button"
          value="edit"
          onClick={() => setIsLocked(false)}
        ><Edit3  
        width="18"
        height="18"/></button>
        <button
          style={{marginLeft: "8px"}}
          type="button"
          onClick={handleDelete}
          value="delete"
        ><Trash2 
        width="18"
        height="18"/></button>
      </form>

    </>
  );
};

export default NoteInputTitle;
