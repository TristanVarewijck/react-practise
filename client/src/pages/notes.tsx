import React from "react";
import { useState } from "react";
import Split from "react-split";
import SideBar from "../components/SideBar";
import Editor from "../components/Editor";
import { createNewNote } from "../utils/noteActions.util";
import { parseDate } from "../utils/parseDate.util";

export type noteProps = {
  readonly id: string;
  body?: string;
  title?: string;
  date: string;
};

const Notes = (): JSX.Element => {
  const [isSubmit, setIsSubmit] = useState<boolean>(true);
  const [notes, setNotes] = useState<noteProps[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string>(
    (notes[0] && notes[0].id) || ""
  );

  const updateNote = (text: string, type: string): void => {
    setNotes((oldNotes: noteProps[]): noteProps[] => {
      return oldNotes.map((oldNote: noteProps) => {
        if (oldNote.id === currentNoteId && type === "mde") {
          return { ...oldNote, body: text, date: parseDate(new Date()) };
        } else if (oldNote.id === currentNoteId && type === "title") {
          return {
            ...oldNote,
            title: text,
            date: parseDate(new Date()),
          };
        } else {
          return oldNote;
        }
      });
    });
  };

  return (
    <>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <SideBar
            notes={notes}
            setNotes={setNotes}
            setCurrentNoteId={setCurrentNoteId}
            currentNoteId={currentNoteId}
            updateNote={updateNote}
            setIsSubmit={setIsSubmit}
            isSubmit={isSubmit}
          />
          <Editor
            notes={notes}
            updateNote={updateNote}
            currentNoteId={currentNoteId}
            setIsSubmit={setIsSubmit}
            isSubmit={isSubmit}
          />
        </Split>
      ) : (
        <div className="emptyState">
          <h1>You have no notes</h1>
          <button
            onClick={() => {
              const newNote = createNewNote();
              setNotes((prevState: noteProps[]) => [...prevState, newNote]);
              setCurrentNoteId(newNote.id);
            }}
          >
            Create one now
          </button>
        </div>
      )}
    </>
  );
};

export default Notes;
