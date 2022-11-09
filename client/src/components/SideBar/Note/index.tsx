import "./style.css";
import { noteProps } from "../../../pages/notes";
import React from "react";

interface NoteElementProps {
  note: noteProps;
  findCurrentNote: () => noteProps;
  setCurrentNoteId: (id: string) => void;
  updateNote: (text: string, type: string) => void;
  isSubmit: boolean;
  setIsSubmit: (isSubmit: boolean) => void;
}

const NoteElement = ({
  note,
  setCurrentNoteId,
  findCurrentNote,
  updateNote,
  isSubmit,
  setIsSubmit,
}: NoteElementProps): JSX.Element => {
  return (
    <>
      <div
        className={`note ${
          note.id === findCurrentNote().id ? "selected-note" : ""
        }`}
        onClick={() => setCurrentNoteId(note.id)}
      >
        <small>{note.date}</small>

        {note.id === findCurrentNote().id ? (
          <form
            onSubmit={(event): void => {
              event.preventDefault();

              // store to localStorage
              // localStorage.setItem();
            }}
          >
            <input
              name="title"
              style={{ display: "block", width: "100%" }}
              className="title-input"
              type="text"
              onChange={(event): void => {
                updateNote(event.target.value, "title");
              }}
              value={note.title || ""}
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
                setIsSubmit(false);
              }}
              value="delete"
            />
          </form>
        ) : (
          <form>
            <input
              name="title"
              style={{ display: "block", width: "100%" }}
              className="title-input"
              type="text"
              onChange={(event): void => {
                updateNote(event.target.value, "title");
              }}
              value={note.title || ""}
              disabled
            />
          </form>
        )}
      </div>
    </>
  );
};

export default NoteElement;
