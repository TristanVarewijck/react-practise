import "./style.css";
import Note from "./Note";

const SideBar = ({
  notes,
  createNewNote,
  findCurrentNote,
  setCurrentNoteId,
  updateNote,
}) => {
  const notesElements = notes.map((note) => {
    return (
      <li key={note.id}>
        <Note
          note={note}
          findCurrentNote={findCurrentNote}
          setCurrentNoteId={setCurrentNoteId}
          updateNote={updateNote}
        />
      </li>
    );
  });

  return (
    <>
      <div className="sidebar">
        <h1>My Notes</h1>
        <button onClick={createNewNote}>
          <img src="/assets/icons/plus-i.svg" alt="add-icon" />
          <p>Add new Note</p>
        </button>
        <ul>{notesElements}</ul>
      </div>
    </>
  );
};

export default SideBar;
