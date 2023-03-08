import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AnotherBar from "./components/NavBar";
import RecipeContainer from "./containers/RecipeContainer";

function App() {
  return (
    <Router>
      <AnotherBar />
      <RecipeContainer />
    </Router>
  );
}

export default App;
