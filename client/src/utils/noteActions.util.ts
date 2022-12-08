import { nanoid } from "nanoid";
import { noteProps } from "../types";
import { setDocument } from "../firebaseService/setDocument";

export const createNewNote = ():string => {
  const newNote = {
    id: nanoid(),
    body: "# Type your markdown note's title here",
    title: "New Note",
    date: Date.now(),
    driveStatus: "none",
    docRef: "",
  };

  setDocument("notes", newNote)
  return newNote.id
};

export const findCurrentNote = (
  notes: noteProps[],
  currentNoteId: string
): noteProps => {
  const currentNote = notes.find((note) => note.id === currentNoteId);
  return currentNote ? currentNote : notes[0];
};

export const updateNote = (
  currentNoteId: string,
  text: string,
  type: string,
  notes: noteProps[]
): noteProps[] => {
  return notes.map((note: noteProps) => {
    if (note.id === currentNoteId && type === "mde") {
      return { ...note, body: text, date: Date.now() };
    } else if (note.id === currentNoteId && type === "title") {
      return {
        ...note,
        title: text,
        date: Date.now(),
      };
    } else {
      return note;
    }
  });
};

