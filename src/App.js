/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './componets/Navbar'
import CreateNote from './componets/CreateNote'
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
import Home from './componets/Home';
import Profile from './componets/Profile';
import ResetPass from './componets/ResetPass';
function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='/createnote' Component={CreateNote}/>
      <Route exact path='/aboutus' Component={About}/>
      <Route exact path='/mynotes'Component={Notes}/>
      <Route exact path='/login'Component={Login}/>
      <Route exact path='/signup'Component={SignUp}/>
      <Route exact path='/profile'Component={Profile}/>
      <Route exact path='/resetpassword'Component={ResetPass}/>
    </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
