import { Link } from "react-router-dom";

const Game = () => {
  return (
    <>
      <h1>game</h1>
      <Link to={"/"}>Home</Link>
      <Link to={"/notes"}>React Notes app</Link>
    </>
  );
};

export default Game;
