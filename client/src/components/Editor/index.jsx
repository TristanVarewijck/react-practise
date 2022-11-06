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

  return (
    <>
      <div className="pane editor">
        <ReactMde
          value={findCurrentNote().body}
          onChange={updateNote}
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
