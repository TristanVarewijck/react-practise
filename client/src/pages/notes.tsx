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
  date: number;
};

const Notes = (): JSX.Element => {
  const [notes, setNotes] = useState<noteProps[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string>("");
  
  return (
    <>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <SideBar
            notes={notes}
            setNotes={setNotes}
            setCurrentNoteId={setCurrentNoteId}
            currentNoteId={currentNoteId}
          />
          <Editor
            notes={notes}
            setNotes={setNotes}
            currentNoteId={currentNoteId}
            setCurrentNoteId={setCurrentNoteId}
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
