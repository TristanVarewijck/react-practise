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
  const date = new Date();

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
      title: "Hello World!",
      date: parseDate(date),
    };

    setNotes((prevState) => [...prevState, newNote]);
    setCurrentNoteId(newNote.id);
  };

  // update a certain node / item
  const updateNote = (text, type) => {
    setNotes((oldNotes) => {
      return oldNotes.map((oldNote) => {
        if (oldNote.id === currentNoteId && type === "mde") {
          return { ...oldNote, body: text };
        } else if (oldNote.id === currentNoteId && type === "title") {
          return { ...oldNote, title: text };
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
          <Editor findCurrentNote={findCurrentNote} updateNote={updateNote} />
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
