import { useState } from "react";
import "./style.css";

const Note = ({ content, setCurrentNoteId, findCurrentNote, updateNote }) => {
  const [currentInputValue, setCurrentInputValue] = useState(content.title);

  return (
    <>
      <div
        className={`note ${
          content.id === findCurrentNote().id ? "selected-note" : ""
        }`}
        onClick={() => setCurrentNoteId(content.id)}
      >
        <small>{content.date}</small>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const { value } = e.target.title;

            console.log("my value:" + value);
            updateNote(value, "title");
          }}
        >
          <input
            name="title"
            style={{ display: "block" }}
            className="title-input"
            type="text"
            onChange={(text) => setCurrentInputValue(text.target.title.value)}
            value={currentInputValue}
          />

          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default Note;
