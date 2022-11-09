import React from "react";
import { useState } from "react";
import Split from "react-split";
import { nanoid } from "nanoid";
import SideBar from "../components/SideBar";
import Editor from "../components/Editor";
import { parseDate } from "../utils/parseDate";

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
  const createNewNote = (): void => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
      title: "New Note",
      date: parseDate(new Date()),
    };

    setNotes((prevState: noteProps[]) => [...prevState, newNote]);
    setCurrentNoteId(newNote.id);
  };

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

  const findCurrentNote = (): noteProps => {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  };

  return (
    <>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <SideBar
            notes={notes}
            createNewNote={createNewNote}
            findCurrentNote={findCurrentNote}
            setCurrentNoteId={setCurrentNoteId}
            updateNote={updateNote}
            setIsSubmit={setIsSubmit}
            isSubmit={isSubmit}
          />
          <Editor
            findCurrentNote={findCurrentNote}
            updateNote={updateNote}
            setIsSubmit={setIsSubmit}
            isSubmit={isSubmit}
          />
        </Split>
      ) : (
        <div className="emptyState">
          <h1>You have no notes</h1>
          <button onClick={createNewNote}>Create one now</button>
        </div>
      )}
    </>
  );
};

export default Notes;
