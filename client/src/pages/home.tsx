import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Two React Projects</h1>
      <Link to={"/game"}>React Game</Link>
      <Link to={"/notes"}>React Notes app</Link>
    </>
  );
};

export default Home;
