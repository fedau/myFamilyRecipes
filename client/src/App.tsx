import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { Router, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Maincontainer from './containers/Maincontainer';
import Homep from './containers/Homep';
import RecipeContainer from './containers/RecipeContainer';
import RecipeList from './components/RecipeList';
import Favourites from './containers/Favourites';
import { useAuth0 } from "@auth0/auth0-react";
import AnotherBar from './components/NavBar';


function App() {

  // const {
  //   user,
  //   isAuthenticated,
  //   loginWithRedirect,
  //   logout,
  // } = useAuth0();

  return (
<Router>
  <AnotherBar/>
  <RecipeContainer/>
</Router>
  );
}

export default App;
