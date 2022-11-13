import { nanoid } from "nanoid";
import { parseDate } from "./parseDate.util";
import { noteProps } from "../pages/notes";

export const createNewNote = (): noteProps => {
  const newNote = {
    id: nanoid(),
    body: "# Type your markdown note's title here",
    title: "New Note",
    date: parseDate(new Date()),
  };
  return newNote;
};

export const findCurrentNote = (
  notes: noteProps[],
  currentNoteId: string
): noteProps => {
  return (
    notes.find((note) => {
      return note.id === currentNoteId;
    }) || notes[0]
  );
};

export const updateNote = (
  currentNoteId: string,
  text: string,
  type: string,
  notes: noteProps[]
): noteProps[] => {
  return notes.map((note: noteProps) => {
    if (note.id === currentNoteId && type === "mde") {
      return { ...note, body: text, date: parseDate(new Date()) };
    } else if (note.id === currentNoteId && type === "title") {
      return {
        ...note,
        title: text,
        date: parseDate(new Date()),
      };
    } else {
      return note;
    }
  });
};

export const deleteNote = (notes: noteProps[], currentNoteId: string) => {
  const newArray = notes.filter((note) => note.id != currentNoteId);
  return newArray;
};
