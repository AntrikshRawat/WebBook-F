import React, { useContext, useEffect, useState} from 'react'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import notecontext from '../context/notes/noteContext'
export default function Profile() {
  const URL = "https://webbook-b.vercel.app/api/auth/getuser";
  const[display ,setDisplay] = useState('flex');
  const[profile , setprofile] = useState({
    name:"",
    email:""
  });
  const{setauthToken,getprofile} = useContext(notecontext);
  const logOut = async() =>{
    localStorage.setItem('token',"");
    setauthToken(localStorage.getItem('token'));
    window.location.replace('/login');
  }
  useEffect(()=>{
    const userprofile = async()=>{
      let user = await getprofile();
      setprofile({
        name:user.name,
        email:user.email
      })
    }
    userprofile();
    setDisplay('none');
  })
  return (
    <>
    <Loading display ={display}/>
    <div className='container my-5 d-flex flex-wrap'>
          <h3 className='w-100 text-md-start m-2'>Name:  {profile.name}</h3>
          <h3 className='w-100 text-md-start m-2'>Email:  {profile.email}</h3>
          <Link to={Profile} className='btn btn-secondary mx-2 mt-3'>Reset Password</Link>
          <button onClick={logOut} className='btn btn-danger mx-2 mt-3'>Log Out</button>
    </div>
    </>
  )
}
