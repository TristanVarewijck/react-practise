import { nanoid } from "nanoid";
import { noteProps } from "../pages/notes";

export const createNewNote = (): noteProps => {
  const newNote = {
    id: nanoid(),
    body: "# Type your markdown note's title here",
    title: "New Note",
    date: Date.now(),
  };
  return newNote;
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

export const deleteNote = (notes: noteProps[], currentNoteId: string) => {
  const newArray = notes.filter((note) => note.id !== currentNoteId);
  return newArray;
};
