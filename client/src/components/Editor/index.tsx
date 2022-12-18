import { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "./style.css";
import React from "react";
import { noteProps } from "../../types";
import NoteInputTitle from "../NoteInputTitle";
import { findCurrentNote, updateNote } from "../../utils/noteActions.util";
import {differenceBetweenTimestamps} from "../../utils/timestampActions.util";
import {MoreHorizontal} from 'react-feather';
import UploadPdf from "../UploadPdf";


type EditorProps = {
  notes: noteProps[];
  activeNote: string;
  setActiveNote: (id: string) => void;
};

const Editor = ({
  notes,
  activeNote,
  setActiveNote,
}: EditorProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<any>("write");
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const currentNote = findCurrentNote(notes, localStorage.getItem("currentNoteId") || "");
  return (
    <>
      <div className="editor">
        <div className="breadCrump">
          <ul>
            <li>My Notes</li>
            <li>
              <img src="assets/icons/arrowRight-i.svg" alt="arrowRight-icon" />
            </li>
            <li>{currentNote.title}</li>
          </ul>
          <button className="breadCrumpButton">
            <MoreHorizontal/>
          </button>
        </div>

        <div className="heading">
          <NoteInputTitle
            notes={notes}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
          <table>
            <tbody>
              <tr>
                <th
                  style={{
                    paddingRight: "15px",
                    fontWeight: "400",
                    opacity: ".55",
                  }}
                >
                 Last modified:
                </th>
                <td>{differenceBetweenTimestamps(currentNote.date)}</td>
              </tr>
            </tbody>
          </table>
          <UploadPdf 
            noteId={currentNote.id} 
            documentType={"indentification"} 
            modalName={"notes"} />
        </div>

        <ReactMde
          value={currentNote.body}
          onChange={(text: string) => {
            // const updatedNotes = updateNote(currentNote.id, text, "mde", notes);
            // setNotes([...updatedNotes]);
          }}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown: string) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          minEditorHeight={80}
          heightUnits="vh"
        />
      </div>
    </>
  );
};

export default Editor;
