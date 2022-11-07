import { useState } from "react";
import Split from "react-split";
import { nanoid } from "nanoid";
import SideBar from "../components/SideBar";
import Editor from "../components/Editor";
import { parseDate } from "../utils/parseDate";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );
  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
      title: "New Note",
      date: parseDate(new Date()),
    };

    setNotes((prevState) => [...prevState, newNote]);
    setCurrentNoteId(newNote.id);
  };

  const updateNote = (text, type) => {
    setNotes((oldNotes) => {
      return oldNotes.map((oldNote) => {
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

  const findCurrentNote = () => {
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
          />
          <Editor
            notes={notes}
            findCurrentNote={findCurrentNote}
            updateNote={updateNote}
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
