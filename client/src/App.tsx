import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { Router, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Maincontainer from './containers/Maincontainer';
import Homep from './containers/Homep';
import RecipeContainer from './containers/RecipeContainer';

function App() {
  return (
   <Router>
    <div className="App">
  {/* <Maincontainer/>*/}
  <Routes>
   <Route path='/' element={ <RecipeContainer/>}/> 
  </Routes>
 <p>appp</p>
    </div>
   </Router>
  );
}

export default App;
