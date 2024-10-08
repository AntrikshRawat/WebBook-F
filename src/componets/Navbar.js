import React, { useContext, useEffect}  from 'react'
import "../index.css"
import {
  Link,
  useLocation,
 } from 'react-router-dom';
import notecontext from '../context/notes/noteContext';
const Navbar = () => {
  let context = useContext(notecontext);
  const{authToken,isLogin ,setIsLogin} = context;
  let location = useLocation();
  useEffect(()=>{
    if(authToken) {
      setIsLogin(true);
    }
  })
  return (
    <nav className="navbar navbar-expand-lg bg-dark w-100">
      <div className="container-fluid">
        <Link className="navbar-brand" to="##">WebBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i className="navbar-toggler-icon fa-solid fa-bars h-50 text-light"></i>
    </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLogin===false && <li className="nav-item">
              <Link className={`nav-link text-${location.pathname==="/"?"light":"secondary"}`} aria-current="page" to="/">Home</Link>
            </li>}
            {isLogin === true && <li className="nav-item">
              <Link className={`nav-link text-${location.pathname==="/createnote"?"light":"secondary"}`} aria-current="page" to="/createnote">CreateNote</Link>
            </li>}
           {isLogin === true && <li className="nav-item">
              <Link className={`nav-link text-${location.pathname==="/mynotes"?"light":"secondary"}`} aria-current="page" to="/mynotes">MyNotes</Link>
            </li>}
           {isLogin === false && <li className="nav-item">
              <Link className={`nav-link text-${location.pathname==="/login"?"light":"secondary"}`} aria-current="page" to="/login">Login</Link>
            </li>}
           {isLogin === false && <li className="nav-item">
              <Link className={`nav-link text-${location.pathname==="/signup"?"light":"secondary"}`} aria-current="page" to="/signup">Sign Up</Link>
            </li>}
            <li className="nav-item">
              <Link className={`nav-link text-${location.pathname==="/aboutus"?"light":"secondary"}`} aria-current="page" to="/aboutus">About Us</Link>
            </li>
          </ul>
           {isLogin === true && <Link to="/profile"><i className="fa-solid fa-user mx-4"></i></Link>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
