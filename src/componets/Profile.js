import React, { useContext, useEffect, useState} from 'react'
import Loading from './Loading'
import {useNavigate } from 'react-router-dom'
import notecontext from '../context/notes/noteContext'
export default function Profile() {
  let navigate = useNavigate();
  const[load,setLoad] = useState(false);
  const[profile , setprofile] = useState({
    name:"",
    email:"",
    display:"flex"
  });
  const{setauthToken,getprofile,emailSend} = useContext(notecontext);
  const logOut = async() =>{
    localStorage.setItem('token',"");
    setauthToken(localStorage.getItem('token'));
    window.location.replace('/login');
  }
  const handleClick =async()=>{
    setLoad(true);
    let res = await emailSend();
    setLoad(false);
   if(res){    
    alert('Otp sent to email');
    navigate('/otppage');
  }else{
    alert('Error Loaging Page');
  }
  }
  useEffect(()=>{
    try{ 
        getprofile().then((res)=>{
      setprofile({
        name:res.name,
        email:res.email,
        display:"none"
      })
    })}
    catch(error) {
      alert("Error Loading Page");
    }
    })
  return (
    <>
    <Loading display ={profile.display}/>
    <div className='container h-25'>
          <h3 className='w-100 text-md-start m-2'>Name: {profile.name}</h3>
          <h3 className='w-100 text-md-start m-2'>Email: {profile.email}</h3>
          <button className="btn btn-secondary mx-2 mt-3" type="button" disabled ={load} onClick={handleClick}>
{ load === true && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
          <span className='mx-2' role="status">Reset Password</span>
          </button>
          <button onClick={logOut} className='btn btn-danger mx-2 mt-3'>Log Out</button>
    </div>
    </>
  )
}
