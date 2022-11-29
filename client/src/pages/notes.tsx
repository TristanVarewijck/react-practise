import React from "react";
import { useState } from "react";
import Split from "react-split";
import SideBar from "../components/SideBar";
import Editor from "../components/Editor";
// import { createNewNote } from "../utils/noteActions.util";
import { useCollection } from "../firebaseService/useCollection";




const Notes = (): JSX.Element => {
  const notes = useCollection("notes")
  const [currentNoteId, setCurrentNoteId] = useState<string>("");
  console.log(notes); 
  
  return (
    <>
    {
      notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
        <SideBar
          notes={notes}
          setCurrentNoteId={setCurrentNoteId}
          currentNoteId={currentNoteId}
        />
        <Editor
          notes={notes}
          currentNoteId={currentNoteId}
          setCurrentNoteId={setCurrentNoteId}
        />
      </Split>
      ) : (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
        <SideBar
          notes={notes}
          setCurrentNoteId={setCurrentNoteId}
          currentNoteId={currentNoteId}
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
