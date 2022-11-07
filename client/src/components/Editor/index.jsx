import { useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

import "./style.css";

const Editor = ({ findCurrentNote, updateNote }) => {
  const [selectedTab, setSelectedTab] = useState("write");
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });
  const currentNote = findCurrentNote();

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
          <form
            onSubmit={(e) => {
              e.preventDefault();

              // store to LocalStorage
            }}
          >
            <input
              name="title"
              style={{ display: "block" }}
              className="title-input"
              type="text"
              onChange={(event) => updateNote(event.target.value, "title")}
              value={currentNote.title || ""}
            />

            <input type="submit" />
          </form>

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
          onChange={(text) => updateNote(text, "mde")}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
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