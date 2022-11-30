import React, { useState } from "react";
import Split from "react-split";
import SideBar from "../components/SideBar";
import Editor from "../components/Editor";
// import { createNewNote } from "../utils/noteActions.util";
import { useCollection } from "../firebaseService/useCollection";




const Notes = (): JSX.Element => {
  const notes = useCollection("notes")
  const [activeNote, setActiveNote] = useState<string>('');
  return (
    <>
    {
      notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
        <SideBar
          notes={notes}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Editor
          notes={notes}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
      </Split>
      ) : (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
        <SideBar
          notes={notes}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <div className="emptyState">
        </div>
      </Split>
      )
        
    }
       
    </>
  );
};

export default Notes;
