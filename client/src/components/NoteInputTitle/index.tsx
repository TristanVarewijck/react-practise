import React from "react";
import "./style.css";
import {
  updateNote,
  findCurrentNote,
  deleteNote,
} from "../../utils/noteActions.util";

interface NoteInputTitleProps {
  notes: any;
  currentNoteId: any;
  setCurrentNoteId: any;
  isSubmit: any;
  setNotes: any;
  setIsSubmit: any;
}

const NoteInputTitle = ({
  notes,
  currentNoteId,
  isSubmit,
  setNotes,
  setIsSubmit,
}: NoteInputTitleProps): JSX.Element => {
  const currentNote = findCurrentNote(notes, currentNoteId);

  console.log(currentNote);
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
          onClick={(): void => {
            const newArray = deleteNote(notes, currentNoteId);
            setNotes([...newArray]);
          }}
          value="delete"
        />
      </form>
    </>
  );
};

export default NoteInputTitle;
