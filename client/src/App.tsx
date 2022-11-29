import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/home";
import Notes from "./pages/notes";
import NotFound from "./pages/notes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
