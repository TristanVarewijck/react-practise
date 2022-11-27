import React, { useState } from "react";
import "./style.css";
import {
  updateNote,
  findCurrentNote,
  deleteNote,
} from "../../utils/noteActions.util";
import { noteProps } from "../../pages/notes";

interface NoteInputTitleProps {
  notes: any;
  currentNoteId: any;
  setCurrentNoteId: (id: string) => void;
  setNotes: any;
}

const NoteInputTitle = ({
  notes,
  currentNoteId,
  setCurrentNoteId,
  setNotes,
}: NoteInputTitleProps): JSX.Element => {
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const currentNote = findCurrentNote(notes, currentNoteId);
  const currentNoteIndex = notes.findIndex(
    (note: noteProps) => note.id === currentNoteId
  );
  const handleDelete = (e: any) => {
    e.stopPropagation();
        if (
          window.confirm(
            `Are you sure you want to delete this note?: ${currentNote.title}`
          )
        ) {
          const newNotes = deleteNote(notes, currentNoteId);
          setNotes([...newNotes]);
          if (newNotes.length >= 1 && currentNoteIndex === 0) {
            setCurrentNoteId(newNotes[0].id);
          } else if (newNotes.length >= 1 && currentNoteIndex !== newNotes.length) {
            setCurrentNoteId(newNotes[currentNoteIndex].id)
          } else if (currentNoteIndex === newNotes.length){
            setCurrentNoteId(newNotes[newNotes.length - 1].id);
          } else {
            setCurrentNoteId("");
          }
        }
  }

  const handleTitleChange = (e: any) => {
    const newTitle = e.target.value;
    const updatedNotes = updateNote(currentNoteId, newTitle, "title", notes);
    setNotes([...updatedNotes]);
  }
  
  return (
    <>
      <form
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
        <input
          type="button"
          value="edit"
          onClick={() => setIsLocked(false)}
        />
        <input
          type="button"
          onClick={handleDelete}
          value="delete"
        />
      </form>

    </>
  );
};

export default NoteInputTitle;
