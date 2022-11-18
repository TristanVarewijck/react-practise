import React from "react";
import { useState } from "react";
import Split from "react-split";
import SideBar from "../components/SideBar";
import Editor from "../components/Editor";
import { createNewNote } from "../utils/noteActions.util";

export type noteProps = {
  readonly id: string;
  body?: string;
  title?: string;
  date: string;
};

const Notes = (): JSX.Element => {
  const [isSubmit, setIsSubmit] = useState<boolean>(true);
  const [notes, setNotes] = useState<noteProps[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string>("");

  console.log(currentNoteId);

  return (
    <>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <SideBar
            notes={notes}
            setNotes={setNotes}
            setCurrentNoteId={setCurrentNoteId}
            currentNoteId={currentNoteId}
            setIsSubmit={setIsSubmit}
            isSubmit={isSubmit}
          />
          <Editor
            notes={notes}
            setNotes={setNotes}
            currentNoteId={currentNoteId}
            setCurrentNoteId={setCurrentNoteId}
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
