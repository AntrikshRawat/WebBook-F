/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './componets/Navbar'
import Home from './componets/Home'
import {
  BrowserRouter as Router,
  Route,
  Routes,
 } from 'react-router-dom';
import About from './componets/About';
import NoteState from './context/notes/NoteState';
import Notes from './componets/Notes';
import Login from './componets/Login';
import SignUp from './componets/SignUp';
function App() {
  localStorage.setItem('token', "");
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='/aboutus' Component={About}/>
      <Route exact path='/mynotes'Component={Notes}/>
      <Route exact path='/login'Component={Login}/>
      <Route exact path='/signup'Component={SignUp}/>
    </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
