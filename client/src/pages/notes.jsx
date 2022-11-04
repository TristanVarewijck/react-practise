import { Link } from "react-router-dom";

const Notes = () => {
  return (
    <>
      <h1>notes</h1>
      <Link to={"/"}>Home</Link>
      <Link to={"/game"}>Game</Link>
    </>
  );
};

export default Notes;
