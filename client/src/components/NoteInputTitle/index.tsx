import React from "react";
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
          onChange={(event): void => {
            let input = event.target.value;
            const updatedNotes = updateNote(
              currentNoteId,
              input,
              "title",
              notes
            );
            setNotes([...updatedNotes]);
          }}
          value={currentNote.title || ""}
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
          onClick={(e): void => {
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
              } else if (newNotes.length >= 1 && currentNoteIndex !== 0) {
                setCurrentNoteId(newNotes[currentNoteIndex - 1].id);
              } else {
                setCurrentNoteId("");
              }
            }
          }}
          value="delete"
        />
      </form>
    </>
  );
};

export default NoteInputTitle;
