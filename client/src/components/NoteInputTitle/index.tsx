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
  isSubmit: any;
  setNotes: any;
  setIsSubmit: any;
}

const NoteInputTitle = ({
  notes,
  currentNoteId,
  setCurrentNoteId,
  isSubmit,
  setNotes,
  setIsSubmit,
}: NoteInputTitleProps): JSX.Element => {
  const currentNote = findCurrentNote(notes, currentNoteId);
  const currentNoteIndex = notes.findIndex(
    (note: noteProps) => note.id === currentNoteId
  );
  const [newTitle, setNewTitle] = useState<string>(currentNote.title || "");
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
    let input = e.target.value;
    setNewTitle(input);
  }
  
  return (
    <>
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
          onChange={handleTitleChange}
          value={newTitle}
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
              if(newTitle !== currentNote.title) {
                const updatedNotes = updateNote(currentNoteId, newTitle, "title", notes);
                setNotes([...updatedNotes]);
              }
            setIsSubmit(true);
            }}
            value="save"
          />
        )}

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
