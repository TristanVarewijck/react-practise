import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

  const auth = true;
  return (
    <>
      <h1>Notes app</h1>

     {auth ? (
        <div className="emptyState">
          <Link to="/notes">Notes</Link>
        </div>
      ) : (

        <div className="authenticate">
          <Link to="/login">Login</Link>
        </div>
        
      )}
      
    </>
  );
};

export default Home;
