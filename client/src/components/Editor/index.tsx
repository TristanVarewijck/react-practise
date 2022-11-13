import { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "./style.css";
import React from "react";
import { noteProps } from "../../pages/notes";
import NoteInputTitle from "../NoteInputTitle";
import { findCurrentNote, updateNote } from "../../utils/noteActions.util";

type EditorProps = {
  notes: noteProps[];
  currentNoteId: string;
  isSubmit: boolean;
  setNotes: (notes: noteProps[]) => void;
  setIsSubmit: (isSubmit: boolean) => void;
};

const Editor = ({
  notes,
  setNotes,
  currentNoteId,
  isSubmit,
  setIsSubmit,
}: EditorProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<any>("write");
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });
  const currentNote = findCurrentNote(notes, currentNoteId);

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
            <img src="assets/icons/more-i.svg" alt="more-icon" />
          </button>
        </div>

        <div className="heading">
          <NoteInputTitle
            notes={notes}
            currentNoteId={currentNoteId}
            isSubmit={isSubmit}
            setNotes={setNotes}
            setIsSubmit={setIsSubmit}
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
                <td>{currentNote.date}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ReactMde
          value={currentNote.body}
          onChange={(text: string) => {
            const updatedNotes = updateNote(currentNoteId, text, "mde", notes);
            setNotes([...updatedNotes]);
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
