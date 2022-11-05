import SideBar from "../components/SideBar";
import Editor from "../components/Editor";

const Notes = () => {
  const notes = [];
  return (
    <>
      {notes.length > 0 ? (
        <div className="myNotes">app</div>
      ) : (
        <div className="emptyState">
          <h1>You have no notes</h1>
          <button>Create one now</button>
        </div>
      )}
    </>
  );
};

export default Notes;
